import React, { useEffect, useState } from 'react';
import { bool, func } from 'prop-types';
import styled, { withTheme } from 'styled-components';
import { Animated, TouchableWithoutFeedback } from 'react-native';

const SwitchTrack = styled.View`
  ${({
    theme: {
      yoga: {
        components: {
          switch: {
            track: {
              width: trackWidth,
              height: trackHeight,
              radii: trackRadii,
              backgroundColor: trackBackgroundColor,
              checked: { backgroundColor: checkedBackgroundColor },
              disabled: { backgroundColor: disabledBackgroundColor },
            },
          },
        },
      },
    },
    checked,
    disabled,
  }) =>
    `
    display: flex;
    justify-content: center;
    width: ${trackWidth}px;
    height: ${trackHeight}px;
    borderRadius: ${trackRadii}px;
    background-color: ${
      checked ? checkedBackgroundColor : trackBackgroundColor
    };

    ${
      disabled
        ? `
        background-color: ${disabledBackgroundColor};`
        : ''
    }
  `};
`;

const SwitchThumb = styled.View`
  ${({
    theme: {
      yoga: {
        components: {
          switch: {
            thumb: {
              width: thumbWidth,
              height: thumbHeight,
              radii: thumbRadii,
              backgroundColor: thumbBackgroundColor,
              disabled: { backgroundColor: disabledBackgroundColor },
            },
          },
        },
      },
    },
    disabled,
  }) =>
    `
  width: ${thumbWidth}px;
  height: ${thumbHeight}px;
  border-radius: ${thumbRadii};
  background-color: ${thumbBackgroundColor};

  ${
    disabled
      ? `
      background-color: ${disabledBackgroundColor};`
      : ``
  }
`};
`;

const CheckboxSwitch = ({
  checked,
  disabled,
  theme: {
    yoga: {
      components: {
        switch: {
          track: {
            width: trackWidth,
            backgroundColor: trackBackgroundColor,
            checked: { backgroundColor: checkedBackgroundColor },
          },
          thumb: { width: thumbWidth, left: thumbLeft },
        },
      },
    },
  },
  onChange,
  ...rest
}) => {
  const [thumbPosition] = useState(new Animated.Value(checked));
  const thumbTo = trackWidth - thumbWidth - thumbLeft;
  const thumbFrom = thumbLeft;

  useEffect(() => {
    const toggle = (isChecked, position) => {
      const animValue = {
        fromValue: isChecked ? 0 : 1,
        toValue: isChecked ? 1 : 0,
        duration: 100,
      };
      Animated.timing(position, animValue).start();
    };

    toggle(!checked, thumbPosition);
  }, [checked]);

  return (
    <TouchableWithoutFeedback onPress={onChange}>
      <SwitchTrack
        checked={checked}
        disabled={disabled}
        as={Animated.View}
        style={{
          backgroundColor:
            !disabled &&
            thumbPosition.interpolate({
              inputRange: [0, 1],
              outputRange: [checkedBackgroundColor, trackBackgroundColor],
            }),
        }}
        {...rest}
      >
        <SwitchThumb
          checked={checked}
          disabled={disabled}
          as={Animated.View}
          style={{
            transform: [
              {
                translateX: thumbPosition.interpolate({
                  inputRange: [0, 1],
                  outputRange: [thumbTo, thumbFrom],
                }),
              },
            ],
          }}
        />
      </SwitchTrack>
    </TouchableWithoutFeedback>
  );
};

CheckboxSwitch.propTypes = {
  checked: bool,
  disabled: bool,
  onChange: func,
};

CheckboxSwitch.defaultProps = {
  checked: false,
  disabled: false,
  onChange: () => {},
};

CheckboxSwitch.displayName = 'Checkbox.Switch';

export default withTheme(CheckboxSwitch);
