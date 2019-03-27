import * as React from 'react';
import '../styles/NavBar.scss';

const FIRST = 0;

enum NavBarDefaults {
  tabColor = '#C8C8C8'
}

export interface NavBarTabDefs {
  [key: string]: NavBarTab;
}

export interface NavBarTab {
  /**
   * If provided, will appear above the title and have a swing up animation applied to it
   */
  icon?: JSX.Element;
  /**
   * Text to indicate tab title
   */
  title: string;
  /**
   * Color to use for the background of the navbar. If different from previous selection, will transition.
   */
  color?: string;
  /**
   * Trigger an action on enter of this tab
   */
  onActive?: () => void;
  /**
   * Trigger an action on exit of this tab
   */
  onLeave?: () => void;
}

export interface NavBarProps {
  /**
   * Definitions for each tab and what behaviors it exhibits
   */
  tabs: NavBarTabDefs;
  /**
   * If provided, acts as the first active tab.
   *
   * @default First_Key_Of_Tabs
   */
  defaultActiveTab?: string;
  /**
   * Dictates if the NavBar is disabled
   *
   * @default false
   */
  disabled?: boolean;
  /**
   * Dictates if the NavBar will take the entire width of its parent
   *
   * @default false
   */
  fullWidth?: boolean;
}

const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  return windowWidth;
};

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
      key={tabKey}
      className="NavBar__Tabs__Item ripple"
      onClick={handleClick.bind({}, tabKey, tabIndex)}
    >
      <div className={`NavBar__Tabs__Item__Icon ${animateVisibleClass}`}>
        {tabs[tabKey].icon || <div>&nbsp;</div>}
      </div>
      <div className={`NavBar__Tabs__Item__Text ${fontSizeClass}`}>
        {tabs[tabKey].title}
      </div>
    </div>
  );
};

export const NavBar: React.FC<NavBarProps> = ({
  tabs,
  defaultActiveTab = Object.keys(tabs)[FIRST],
  disabled = false,
  fullWidth = false
}: NavBarProps) => {
  const [activeTabKey, setActiveTabKey] = React.useState(defaultActiveTab);
  const [width, setWidth] = React.useState(500);
  const windowWidth = useWindowWidth();
  const tabKeys = Object.keys(tabs);
  const [activeTabIndex, setActiveTabIndex] = React.useState(
    tabKeys.indexOf(defaultActiveTab)
  );
  const element = React.useRef<HTMLDivElement>(null);
  const activeTab = tabs[activeTabKey];
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
  React.useEffect(() => {
    const newWidth =
      fullWidth &&
      element.current &&
      element.current.parentElement &&
      element.current.parentElement.clientWidth
        ? element.current.parentElement.clientWidth
        : tabKeys.length > 2
        ? tabKeys.length * 100
        : 300;
    setWidth(newWidth);
  }, [element.current, windowWidth]);
  return (
    <div className="NavBar" ref={element}>
      <svg width={`${width}`} height="75" viewBox={`0 0 ${width} 75`}>
        <g className="NavBar__Svg" fill={color} fillRule="evenodd">
          <path className="NavBar__Svg__Bar" d={`M0 25h${width}v50H0z`} />
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
      <div className="NavBar__Tabs">
        {tabKeys.map(createNavBarContent(activeTabKey, tabs, handleClick))}
      </div>
    </div>
  );
};
