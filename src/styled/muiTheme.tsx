import { ComponentsOverrides, ComponentsProps, ComponentsVariants } from '@mui/material'
import { createTheme } from '@mui/material/styles'
import MuiStepConnector from '@mui/material/StepConnector'

import CheckboxCheckedIcon from 'public/icons/checkbox-checked.svg'
import RadioIcon from 'public/icons/radio.svg'
import RadioActiveIcon from 'public/icons/radio-active.svg'
import RatingFilled from 'public/icons/rating/filled.svg'
import RatingEmpty from 'public/icons/rating/empty.svg'
import SignRightIcon from 'public/icons/arrows/sign-right.svg'

interface MuiButtonBase {
  defaultProps?: ComponentsProps['MuiButtonBase']
  styleOverrides?: ComponentsOverrides<{}>['MuiButtonBase']
  variants?: ComponentsVariants['MuiButtonBase']
}

interface MuiTypography {
  defaultProps?: ComponentsProps['MuiTypography']
  styleOverrides?: ComponentsOverrides<{}>['MuiTypography']
  variants?: ComponentsVariants['MuiTypography']
}

interface MuiButton {
  defaultProps?: ComponentsProps['MuiButton']
  styleOverrides?: ComponentsOverrides<{}>['MuiButton']
  variants?: ComponentsVariants['MuiButton']
}

interface MuiAutocomplete {
  defaultProps?: ComponentsProps['MuiAutocomplete']
  styleOverrides?: ComponentsOverrides<{}>['MuiAutocomplete']
  variants?: ComponentsVariants['MuiAutocomplete']
}

interface MuiTextField {
  defaultProps?: ComponentsProps['MuiTextField']
  styleOverrides?: ComponentsOverrides<{}>['MuiTextField']
  variants?: ComponentsVariants['MuiTextField']
}

interface MuiTabs {
  defaultProps?: ComponentsProps['MuiTabs']
  styleOverrides?: ComponentsOverrides<{}>['MuiTabs']
  variants?: ComponentsVariants['MuiTabs']
}

interface MuiTab {
  defaultProps?: ComponentsProps['MuiTab']
  styleOverrides?: ComponentsOverrides<{}>['MuiTab']
  variants?: ComponentsVariants['MuiTab']
}

interface MuiCheckbox {
  defaultProps?: ComponentsProps['MuiCheckbox']
  styleOverrides?: ComponentsOverrides<{}>['MuiCheckbox']
  variants?: ComponentsVariants['MuiCheckbox']
}

interface MuiRadio {
  defaultProps?: ComponentsProps['MuiRadio']
  styleOverrides?: ComponentsOverrides<{}>['MuiRadio']
  variants?: ComponentsVariants['MuiRadio']
}

interface MuiStepper {
  defaultProps?: ComponentsProps['MuiStepper']
  styleOverrides?: ComponentsOverrides<{}>['MuiStepper']
  variants?: ComponentsVariants['MuiStepper']
}

interface MuiStep {
  defaultProps?: ComponentsProps['MuiStep']
  styleOverrides?: ComponentsOverrides<{}>['MuiStep']
  variants?: ComponentsVariants['MuiStep']
}

interface MuiStepLabel {
  defaultProps?: ComponentsProps['MuiStepLabel']
  styleOverrides?: ComponentsOverrides<{}>['MuiStepLabel']
  variants?: ComponentsVariants['MuiStepLabel']
}

interface MuiSelect {
  defaultProps?: ComponentsProps['MuiSelect']
  styleOverrides?: ComponentsOverrides<{}>['MuiSelect']
  variants?: ComponentsVariants['MuiSelect']
}

interface MuiInputLabel {
  defaultProps?: ComponentsProps['MuiInputLabel']
  styleOverrides?: ComponentsOverrides<{}>['MuiInputLabel']
  variants?: ComponentsVariants['MuiInputLabel']
}

interface MuiMenuItem {
  defaultProps?: ComponentsProps['MuiMenuItem']
  styleOverrides?: ComponentsOverrides<{}>['MuiMenuItem']
  variants?: ComponentsVariants['MuiMenuItem']
}

interface MuiRating {
  defaultProps?: ComponentsProps['MuiRating']
  styleOverrides?: ComponentsOverrides<{}>['MuiRating']
  variants?: ComponentsVariants['MuiRating']
}

interface MuiCircularProgress {
  defaultProps?: ComponentsProps['MuiCircularProgress']
  styleOverrides?: ComponentsOverrides<{}>['MuiCircularProgress']
  variants?: ComponentsVariants['MuiCircularProgress']
}

interface MuiInputAdornment {
  defaultProps?: ComponentsProps['MuiInputAdornment']
  styleOverrides?: ComponentsOverrides<{}>['MuiInputAdornment']
  variants?: ComponentsVariants['MuiInputAdornment']
}

interface MuiChip {
  defaultProps?: ComponentsProps['MuiChip']
  styleOverrides?: ComponentsOverrides<{}>['MuiChip']
  variants?: ComponentsVariants['MuiChip']
}

interface MuiAccordion {
  defaultProps?: ComponentsProps['MuiAccordion']
  styleOverrides?: ComponentsOverrides<{}>['MuiAccordion']
  variants?: ComponentsVariants['MuiAccordion']
}

interface MuiAccordionSummary {
  defaultProps?: ComponentsProps['MuiAccordionSummary']
  styleOverrides?: ComponentsOverrides<{}>['MuiAccordionSummary']
  variants?: ComponentsVariants['MuiAccordionSummary']
}

interface MuiAccordionDetails {
  defaultProps?: ComponentsProps['MuiAccordionDetails']
  styleOverrides?: ComponentsOverrides<{}>['MuiAccordionDetails']
  variants?: ComponentsVariants['MuiAccordionDetails']
}

const MuiButtonBase: MuiButtonBase = {
  defaultProps: {
    disableRipple: true
  }
}

const MuiTypography: MuiTypography = {
  defaultProps: {
    noWrap: true
  }
}

const MuiButton: MuiButton = {
  defaultProps: {
    variant: 'contained',
    classes: {
      root: 'button',
      outlined: 'button-outlined',
      endIcon: 'button-end-icon',
      text: 'button-text'
    }
  }
}

const MuiAutocomplete: MuiAutocomplete = {
  defaultProps: {
    classes: {
      root: 'autocomplete',
      inputRoot: 'autocomplete-input-root',
      hasPopupIcon: 'autocomplete-has-popup-icon',
      input: 'autocomplete-input',
      popper: 'autocomplete-popper',
      paper: 'autocomplete-paper',
      listbox: 'autocomplete-listbox',
      focused: 'autocomplete-focused'
    },
    disablePortal: true
  }
}

const MuiTextField: MuiTextField = {
  defaultProps: {
    classes: {
      root: 'text-field-root'
    },
    InputLabelProps: {
      classes: {
        root: 'text-field-label',
        focused: 'text-field-label-focused',
        shrink: 'text-field-label-shrink',
        error: 'text-field-label-error'
      }
    },
    InputProps: {
      classes: {
        root: 'text-field-input-root',
        input: 'text-field-input',
        error: 'text-field-input-error'
      }
    }
  }
}

const MuiTabs: MuiTabs = {
  defaultProps: {
    classes: {
      scroller: 'tabs-scroller',
      flexContainer: 'tabs-flex-container',
      indicator: 'tabs-indicator'
    }
  }
}

const MuiTab: MuiTab = {
  defaultProps: {
    classes: {
      selected: 'tab-selected'
    }
  }
}

const MuiCheckbox: MuiCheckbox = {
  defaultProps: {
    icon: undefined,
    checkedIcon: <CheckboxCheckedIcon />
  }
}

const MuiRadio: MuiRadio = {
  defaultProps: {
    icon: <RadioIcon />,
    checkedIcon: <RadioActiveIcon />
  }
}

const MuiStepper: MuiStepper = {
  defaultProps: {
    connector: (
      <MuiStepConnector classes={{ root: 'step-connector-root', line: 'step-connector-line' }} />
    )
  }
}

const MuiStep: MuiStep = {
  defaultProps: {
    classes: {
      completed: 'step-completed'
    }
  }
}

const MuiStepLabel: MuiStepLabel = {
  defaultProps: {
    classes: {
      iconContainer: 'step-label-icon-container',
      label: 'step-label',
      active: 'step-label-active',
      completed: 'step-label-completed'
    },
    StepIconProps: {
      classes: {
        root: 'step-label-icon',
        active: 'step-label-icon-active',
        completed: 'step-label-icon-completed',
        text: 'step-label-icon-text'
      }
    }
  }
}

const MuiSelect: MuiSelect = {
  defaultProps: {
    classes: {
      select: 'select',
      icon: 'select-icon',
      iconOpen: 'select-icon-open'
    },
    IconComponent: (props) => <SignRightIcon {...props} />,
    MenuProps: {
      classes: {
        paper: 'select-menu-paper',
        list: 'select-menu-list'
      },
      disablePortal: true
    },
    inputProps: {}
  }
}

const MuiInputLabel: MuiInputLabel = {
  defaultProps: {
    classes: {
      shrink: 'input-label-shrink',
      filled: 'input-label-filled',
      focused: 'input-label-focused'
    }
  }
}

const MuiMenuItem: MuiMenuItem = {
  defaultProps: {
    classes: {
      selected: 'menu-item-selected'
    }
  }
}

const MuiRating: MuiRating = {
  defaultProps: {
    emptyIcon: <RatingEmpty />,
    icon: <RatingFilled />
  }
}

const MuiCircularProgress: MuiCircularProgress = {
  defaultProps: {
    classes: {
      root: 'circular-progress'
    }
  }
}

const MuiInputAdornment: MuiInputAdornment = {
  defaultProps: {
    classes: {
      root: 'input-adornment'
    }
  }
}

const MuiChip: MuiChip = {
  defaultProps: {
    classes: {
      root: 'chip',
      label: 'chip-label',
      deleteIcon: 'chip-delete-icon'
    }
  }
}

const MuiAccordion: MuiAccordion = {
  defaultProps: {
    disableGutters: true
  }
}

const MuiAccordionSummary: MuiAccordionSummary = {
  defaultProps: {
    classes: {
      content: 'accordion-summary-content',
      expanded: 'accordion-summary-expanded',
      expandIconWrapper: 'accordion-expand-icon-container'
    }
  }
}

const MuiAccordionDetails: MuiAccordionDetails = {
  defaultProps: {
    classes: {}
  }
}

const typography = {
  fontFamily: ['TTCommons', 'Roboto', 'Arial', 'sans-serif'].join(','),
  htmlFontSize: 16,

  h1: {
    fontFamily: 'TTCommons',
    fontWeight: 700,
    fontSize: 50,
    lineHeight: '55px'
  },

  h2: {
    fontFamily: 'Stolzl',
    fontWeight: 500,
    fontSize: 24,
    lineHeight: '34px'
  },

  h4: {
    fontSize: 20,
    fontWeight: 500,
    lineHeight: '26px'
  },

  h5: {
    fontWight: 600,
    fontSize: 18,
    lineHeight: '22px'
  },

  body1: {
    fontSize: 16,
    lineHeight: '20px'
  },
  body2: {
    fontSize: 18,
    lineHeight: '22px'
  }
}

export const muiTheme = createTheme({
  components: {
    MuiButtonBase,
    MuiTypography,
    MuiButton,
    MuiAutocomplete,
    MuiTextField,
    MuiTabs,
    MuiTab,
    MuiCheckbox,
    MuiRadio,
    MuiStepper,
    MuiStep,
    MuiStepLabel,
    MuiSelect,
    MuiInputLabel,
    MuiMenuItem,
    MuiRating,
    MuiCircularProgress,
    MuiInputAdornment,
    MuiChip,
    MuiAccordion,
    MuiAccordionSummary,
    MuiAccordionDetails
  },
  typography
})
