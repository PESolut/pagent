INSERT INTO affirmations (
  event_type,
  source_db,
  payload,
  status,
  meta,
  created_at,
  updated_at
) VALUES 
(
  'sprint_created',
  'notion_sprints_db',
  '{"sprint_name": "Sprint 001", "notion_id": "abc123"}',
  'completed',
  '{"jira_epic_id": "PROJ-101"}',
  NOW(),
  NOW()
),
(
  'task_created',
  'notion_tasks_db',
  '{"task_name": "Build webhook parser", "notion_id": "def456"}',
  'pending',
  '{}',
  NOW(),
  NOW()
),
(
  'status_updated',
  'notion_tasks_db',
  '{"task_name": "Send IG DM", "new_status": "done"}',
  'processing',
  '{"dm_attempted": true}',
  NOW(),
  NOW()
);
