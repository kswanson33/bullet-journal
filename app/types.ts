export type Todo = {
  id: string,
  task: string,
  bullet_style: 'point' | 'box' | 'star',
  date_created: any,
  date_begin: any,
  date_complete: any
}

export type BulletStyle = 'point' | 'box' | 'star' | 'arrow'
