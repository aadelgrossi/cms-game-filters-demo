export enum GameStatus {
  PLAYABLE = 'playable',
  IN_DEVELOPMENT = 'in_development'
}

export type StatusOption = {
  value?: GameStatus
  label: string
}

export const gameStatusOptions: StatusOption[] = [
  {
    value: undefined,
    label: 'Any'
  },
  {
    value: GameStatus.PLAYABLE,
    label: 'Playable'
  },
  {
    value: GameStatus.IN_DEVELOPMENT,
    label: 'In Development'
  }
]
