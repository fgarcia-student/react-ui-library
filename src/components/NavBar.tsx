import * as React from 'react';
import '../styles/NavBar.scss';

enum NavBarDefaults {
  tabColor = '#C8C8C8'
}

export interface NavBarTabDefs {
  [key: string]: NavBarTab;
}

export interface NavBarTab {
  icon?: JSX.Element;
  title: string;
  color?: string;
  onActive?: () => void;
  onLeave?: () => void;
}

export interface NavBarProps {
  tabs: NavBarTabDefs;
  defaultActiveTab: string;
  disabled?: boolean;
}

const createNavBarContent = (
  activeTabKey: string,
  tabs: NavBarTabDefs,
  handleClick: (tabKey: string, tabIndex: number) => void
) => (tabKey: string, tabIndex: number) => {
  const isCurrentlyActiveTab = activeTabKey === tabKey;
  const fontSizeClass = isCurrentlyActiveTab ? 'font__lg' : 'font__md';
  const animateVisibleClass = isCurrentlyActiveTab ? 'popUpIcon' : '';
  return (
    <div
      className="NavBar__Content__Item ripple"
      onClick={handleClick.bind({}, tabKey, tabIndex)}
    >
      <div className={`NavBar__Content__Item__Icon ${animateVisibleClass}`}>
        {tabs[tabKey].icon || <div>&nbsp;</div>}
      </div>
      <div className={`NavBar__Content__Item__Text ${fontSizeClass}`}>
        {tabs[tabKey].title}
      </div>
    </div>
  );
};

export const NavBar: React.FunctionComponent<NavBarProps> = ({
  tabs,
  defaultActiveTab,
  disabled
}: NavBarProps) => {
  const [activeTabKey, setActiveTabKey] = React.useState(defaultActiveTab);
  const tabKeys = Object.keys(tabs);
  const [activeTabIndex, setActiveTabIndex] = React.useState(
    tabKeys.indexOf(defaultActiveTab)
  );
  const activeTab = tabs[activeTabKey];
  if (activeTab) {
    const { color = NavBarDefaults.tabColor, ...actions } = activeTab;
    const handleClick = React.useCallback(
      (pressedTabKey: string, pressedTabIndex: number) => {
        if (pressedTabKey !== activeTabKey && !disabled) {
          const newActiveTab = tabs[pressedTabKey];
          if (actions.onLeave) {
            actions.onLeave();
          }
          if (newActiveTab.onActive) {
            newActiveTab.onActive();
          }
          setActiveTabKey(pressedTabKey);
          setActiveTabIndex(pressedTabIndex);
        }
      },
      [disabled, activeTabKey]
    );
    return (
      <div className="NavBar">
        <svg
          width={`${tabKeys.length * 100}`}
          height="75"
          viewBox={`0 0 ${tabKeys.length * 100} 75`}
        >
          <g className="NavBar__Svg" fill={color} fill-rule="evenodd">
            <path
              className="NavBar__Svg__Bar"
              d={`M0 25h${tabKeys.length * 100}v50H0z`}
            />
            <path
              className="NavBar__Svg__Tab"
              d={`M${activeTabIndex * 100 + 86},25 C${activeTabIndex * 100 +
                74},25 ${activeTabIndex * 100 + 69},5 ${activeTabIndex * 100 +
                48},5 C${activeTabIndex * 100 + 27},5 ${activeTabIndex * 100 +
                24},25 ${activeTabIndex * 100 + 10},25 L${activeTabIndex * 100 +
                86},25 Z`}
            />
          </g>
        </svg>
        <div className="NavBar__Content">
          {tabKeys.map(createNavBarContent(activeTabKey, tabs, handleClick))}
        </div>
      </div>
    );
  }

  return null;
};
