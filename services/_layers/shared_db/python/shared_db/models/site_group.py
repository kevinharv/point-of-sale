
from sqlalchemy import Column, Integer, String, ForeignKey, Text, Boolean
from sqlalchemy.orm import relationship, backref
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import Session
from typing import List, Optional

Base = declarative_base()

class SiteGroup(Base):
    __tablename__ = 'site_groups'
    
    id = Column(Integer, primary_key=True)
    name = Column(String(255), unique=True, nullable=False)
    description = Column(Text)
    parent_id = Column(Integer, ForeignKey('site_groups.id'), nullable=True)
    is_active = Column(Boolean, default=True)
    
    # Self-referential relationship
    parent = relationship("SiteGroup", remote_side=[id], backref=backref("children"))
    
    def __repr__(self):
        return f"<SiteGroup(id={self.id}, name='{self.name}', parent_id={self.parent_id})>"
    
    def get_ancestors(self, session: Session) -> List['SiteGroup']:
        """Get all ancestors (parents) of this group"""
        ancestors = []
        current = self.parent
        
        while current:
            ancestors.append(current)
            current = current.parent
        
        return ancestors
    
    def get_descendants(self, session: Session) -> List['SiteGroup']:
        """Get all descendants (children) of this group recursively"""
        descendants = []
        
        def collect_children(group):
            for child in group.children:
                descendants.append(child)
                collect_children(child)
        
        collect_children(self)
        return descendants
    
    def get_path(self, session: Session) -> List['SiteGroup']:
        """Get path from root to this group"""
        path = [SiteGroup(self)]
        current = self.parent
        
        while current:
            path.insert(0, current)
            current = current.parent
        
        return path
    
    def get_level(self) -> int:
        """Get the depth level of this group (root = 0)"""
        level = 0
        current = self.parent
        
        while current:
            level += 1
            current = current.parent
        
        return level
    
    def to_dict(self, include_children=False):
        result = {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'parent_id': self.parent_id,
            'is_active': self.is_active,
            'level': self.get_level()
        }
        
        if include_children and self.children:
            result['children'] = [child.to_dict(include_children=True) 
                                for child in self.children]
        
        return result