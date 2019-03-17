import * as React from 'react';
import '../styles/Toggle.scss';

enum ToggleDefaults {
  borderColor = '#979797',
  backgroundColor = '#C8C8C8',
  indicatorColor = '#D8D8D8'
}

export interface ToggleProps {
  /**
   * this dictates the width and height of the toggle element
   *
   * @default 200
   */
  size?: number;
  /**
   * this dictates the border color of the toggle element
   *
   * @default #979797
   */
  borderColorInactive?: string;
  /**
   * this dictates the border color of the toggle element
   *
   * @default borderColorInactive
   */
  borderColorActive?: string;
  /**
   * this dictates the color of the toggle element background
   *
   * @default #C8C8C8
   */
  backgroundColorInactive?: string;
  /**
   * this dictates the color of the toggle element background
   *
   * @default backgroundColorInactive
   */
  backgroundColorActive?: string;
  /**
   * this dictates the color of the toggle element indicator
   *
   * @default #D8D8D8
   */
  indicatorColorInactive?: string;
  /**
   * this dictates the color of the toggle element indicator
   *
   * @default indicatorColorInactive
   */
  indicatorColorActive?: string;
  /**
   * this dictates if the toggle initializes active or inactive
   *
   * @default false
   * */
  defaultState?: boolean;
  /**
   * this dictates if the toggle is disabled
   *
   * @default false
   */
  disabled?: boolean;
  /**
   * this dictates the action performed when
   * the toggle switches from inactive to active
   * */
  onToggleOn?: () => void;
  /**
   * this dictates the action performed when
   * the toggle switches from active to inactive
   * */
  onToggleOff?: () => void;
  /** this dictates the action performed on both
   * active -> inactive
   * and
   * inactive -> active
   * */
  onToggle?: (nextState: boolean) => void;
}

export const Toggle: React.FunctionComponent<ToggleProps> = ({
  borderColorInactive = ToggleDefaults.borderColor,
  borderColorActive = borderColorInactive,
  backgroundColorInactive = ToggleDefaults.backgroundColor,
  backgroundColorActive = backgroundColorInactive,
  indicatorColorInactive = ToggleDefaults.indicatorColor,
  indicatorColorActive = indicatorColorInactive,
  size = 200,
  defaultState = false,
  disabled = false,
  ...actions
}: ToggleProps) => {
  const [toggled, setToggled] = React.useState(defaultState);
  const toggledClass = toggled ? 'Toggle__indicator--toggled' : '';
  const disabledClass = disabled ? '--disabled' : '';
  const borderColor = toggled ? borderColorActive : borderColorInactive;
  const backgroundColor = toggled
    ? backgroundColorActive
    : backgroundColorInactive;
  const indicatorColor = toggled
    ? indicatorColorActive
    : indicatorColorInactive;

  const handleToggle = React.useCallback(() => {
    setToggled(currentState => {
      const result = disabled ? currentState : !currentState;
      if (!disabled) {
        if (actions.onToggle) {
          actions.onToggle(result);
        }
        if (currentState) {
          if (actions.onToggleOff) {
            actions.onToggleOff();
          }
        } else {
          if (actions.onToggleOn) {
            actions.onToggleOn();
          }
        }
      }
      return result;
    });
  }, [disabled]);

  return (
    <div>
      <svg
        className={`Toggle${disabledClass}`}
        width={size}
        height={size}
        stroke={borderColor}
        onClick={handleToggle}
        viewBox={`0 0 200 100`}
      >
        <path
          className="Toggle__background"
          d="M150 99.5c27.338 0 49.5-22.162 49.5-49.5S177.338.5 150 .5H50C22.662.5.5 22.662.5 50S22.662 99.5 50 99.5h100z"
          strokeOpacity=".500"
          fill={backgroundColor}
        />
        <circle
          className={`Toggle__indicator ${toggledClass}`}
          strokeOpacity=".500"
          fill={indicatorColor}
          cx="50"
          cy="50"
          r="45"
        />
      </svg>
    </div>
  );
};
