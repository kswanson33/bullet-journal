export type Todo = {
  id: string,
  task: string,
  bullet_style: 'point' | 'box' | 'star',
  date_created: string,
  date_begin: string,
  date_complete: string | null
}

export type BulletStyle = 'point' | 'box' | 'star' | 'arrow'

export type Era = 'past' | 'present' | 'future'
