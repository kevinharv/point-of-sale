import os
import json
import boto3
import logging
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import NullPool
from contextlib import contextmanager

logger = logging.getLogger(__name__)

class DatabaseManager:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(DatabaseManager, cls).__new__(cls)
            cls._instance._initialized = False
        return cls._instance
    
    def __init__(self):
        if self._initialized:
            return
        
        self.engine = None
        self.SessionLocal = None
        self._initialize_connection()
        self._initialized = True

    def _get_db_credentials(self):
        secret_name = os.environ.get("DB_SECRET_NAME")

        if secret_name:
            try:
                session = boto3.session.Session()
                client = session.client("secretsmanager")
                response = client.get_secret_value(SecretId=secret_name)
                secret = json.loads(response["SecretString"])

                return {
                    "host": secret["host"],
                    "port": secret["port"],
                    "username": secret["username"],
                    "password": secret["password"],
                    "database": secret["dbname"]
                }
            except Exception as e:
                logger.error(f"Error retrieving database credentials: {e}")
                raise
        
        return {
            "host": os.environ.get("DB_HOST"),
            "port": os.environ.get("DB_PORT", default=5432),
            "username": os.environ.get("DB_USERNAME"),
            "password": os.environ.get("DB_PASSWORD"),
            "database": os.environ.get("DB_NAME")
        }
        
    def _initialize_connection(self):
        credentials = self._get_db_credentials()
        connection_string = (
            f"postgresql://{credentials['username']}:{credentials['password']}"
            f"@{credentials['host']}:{credentials['port']}/{credentials['database']}"
        )

        self.engine = create_engine(
            connection_string,
            poolclass=NullPool,  # Important for Lambda
            echo=os.environ.get('SQL_DEBUG', 'false').lower() == 'true',
            pool_pre_ping=True,  # Verify connections before use
            connect_args={
                "connect_timeout": 10,
                "application_name": f"LAMBDA-POS"
            }
        )
        
        self.SessionLocal = sessionmaker(
            autocommit=False,
            autoflush=False,
            bind=self.engine
        )

    def get_session(self):
        """Get a new database session"""
        return self.SessionLocal()
    
    def get_engine(self):
        """Get the database engine"""
        return self.engine
    
    @contextmanager
    def session_scope(self):
        """Provide a transactional scope around a series of operations"""
        session = self.get_session()
        try:
            yield session
            session.commit()
        except Exception:
            session.rollback()
            raise
        finally:
            session.close()

# Global instance
db_manager = DatabaseManager()
