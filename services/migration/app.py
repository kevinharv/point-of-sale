import json
import logging
from shared_db import User, with_db_session, DatabaseRepository

logger = logging.getLogger()
logger.setLevel(logging.INFO)

@with_db_session
def create_user_handler(session, event, context):
    """Create a new user"""
    try:
        body = json.loads(event['body'])
        
        user_repo = DatabaseRepository(User, session)
        
        new_user = user_repo.create(
            email=body['email'],
            username=body['username'],
        )
        
        return {
            'statusCode': 201,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps(new_user.to_dict())
        }
        
    except Exception as e:
        logger.error(f"Error creating user: {e}")
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'error': str(e)})
        }

@with_db_session
def get_user_handler(session, event, context):
    """Get user by ID"""
    try:
        user_id = int(event['pathParameters']['id'])
        
        user_repo = DatabaseRepository(User, session)
        user = user_repo.get_by_id(user_id)
        
        if not user:
            return {
                'statusCode': 404,
                'headers': {'Content-Type': 'application/json'},
                'body': json.dumps({'error': 'User not found'})
            }
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps(user.to_dict())
        }
        
    except Exception as e:
        logger.error(f"Error getting user: {e}")
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'error': str(e)})
        }

def handler(event, context):
    """Route requests to appropriate handlers"""
    http_method = event['httpMethod']
    
    if http_method == 'POST':
        return create_user_handler(event, context)
    elif http_method == 'GET':
        return get_user_handler(event, context)
    else:
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
