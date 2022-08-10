enum GamePlatform {
  WINDOWS = 'windows',
  MAC_OS = 'mac_os',
  IOS = 'ios',
  ANDROID = 'android'
}

export type PlatformOption = {
  value: GamePlatform
  label: string
}

export const platformsOptions: PlatformOption[] = [
  {
    value: GamePlatform.WINDOWS,
    label: 'Windows'
  },
  {
    value: GamePlatform.MAC_OS,
    label: 'Mac OS'
  },
  {
    value: GamePlatform.IOS,
    label: 'iOS'
  },
  {
    value: GamePlatform.ANDROID,
    label: 'Android'
  }
]
