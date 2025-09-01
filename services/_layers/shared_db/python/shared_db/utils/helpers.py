from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from typing import Type, Optional, List, Any
import logging

logger = logging.getLogger(__name__)

class DatabaseRepository:
    """Generic repository pattern for database operations"""
    
    def __init__(self, model_class: Type, session: Session):
        self.model_class = model_class
        self.session = session
    
    def create(self, **kwargs) -> Any:
        """Create a new instance"""
        try:
            instance = self.model_class(**kwargs)
            self.session.add(instance)
            self.session.flush()  # Get the ID without committing
            return instance
        except SQLAlchemyError as e:
            logger.error(f"Error creating {self.model_class.__name__}: {e}")
            raise
    
    def get_by_id(self, id: int) -> Optional[Any]:
        """Get instance by ID"""
        return self.session.query(self.model_class).filter(
            self.model_class.id == id
        ).first()
    
    def get_all(self, limit: int = 100, offset: int = 0) -> List[Any]:
        """Get all instances with pagination"""
        return self.session.query(self.model_class).offset(offset).limit(limit).all()
    
    def update(self, id: int, **kwargs) -> Optional[Any]:
        """Update instance by ID"""
        try:
            instance = self.get_by_id(id)
            if instance:
                for key, value in kwargs.items():
                    if hasattr(instance, key):
                        setattr(instance, key, value)
                self.session.flush()
            return instance
        except SQLAlchemyError as e:
            logger.error(f"Error updating {self.model_class.__name__}: {e}")
            raise
    
    def delete(self, id: int) -> bool:
        """Delete instance by ID"""
        try:
            instance = self.get_by_id(id)
            if instance:
                self.session.delete(instance)
                self.session.flush()
                return True
            return False
        except SQLAlchemyError as e:
            logger.error(f"Error deleting {self.model_class.__name__}: {e}")
            raise