from functools import wraps
from .connection import db_manager
import logging

logger = logging.getLogger(__name__)

def with_db_session(func):
    """Decorator to automatically handle database sessions"""
    @wraps(func)
    def wrapper(*args, **kwargs):
        with db_manager.session_scope() as session:
            # Add session as first argument
            return func(session, *args, **kwargs)
    return wrapper

def get_db_session():
    """Get a database session (use with context manager)"""
    return db_manager.session_scope()
