
from sqlalchemy import Column, Integer, String, ForeignKey, Text, Boolean
from sqlalchemy.orm import relationship, backref
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import Session
from typing import List, Optional

Base = declarative_base()

class Site(Base):
    __tablename__ = 'sites'
    
    id = Column(Integer, primary_key=True)
    name = Column(String(255), unique=True, nullable=False)
    description = Column(Text)
    address = Column(Text)
    group_id = Column(Integer, ForeignKey('site_groups.id'), nullable=True)
    is_active = Column(Boolean, default=True)
    
    # Self-referential relationship
    parent = relationship("SiteGroup", remote_side=[id], backref=backref("children"))
    
    def __repr__(self):
        return f"<Site(id={self.id}, name='{self.name}', group_id={self.group_id})>"
    
    def to_dict(self, include_children=False):
        result = {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'group_id': self.group_id,
            'is_active': self.is_active,
        }
        
        if include_children and self.children:
            result['children'] = [child.to_dict(include_children=True) 
                                for child in self.children]
        
        return result