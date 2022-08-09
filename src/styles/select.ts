import { StylesConfig } from 'react-select'

export const dropdownStyles: StylesConfig = {
  menuPortal: base => ({ ...base, zIndex: 9999 }),
  control: styles => ({
    ...styles,
    minWidth: 180,
    backgroundColor: '#222',
    borderColor: '#333',
    padding: '2px 0',
    borderRadius: 12
  }),
  container: styles => ({
    ...styles,
    color: '#fff',
    borderRadius: 12,
    backgroundColor: '#222'
  }),
  multiValueLabel: styles => ({
    ...styles,
    color: '#ccc'
  }),
  multiValue: styles => ({
    ...styles,
    backgroundColor: '#444',
    borderRadius: 8
  }),
  singleValue: styles => ({
    ...styles,
    color: '#ccc'
  }),
  option: (styles, state) => ({
    ...styles,
    backgroundColor: state.isFocused
      ? '#555'
      : state.isSelected
      ? '#444'
      : '#222'
  })
}
