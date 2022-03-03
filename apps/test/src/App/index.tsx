import styles from './index.module.less';
import { Link, Route, Redirect, useLocation } from 'react-router-dom';
import Home from './Home';
import Detail from './Detail';
import { Tabs } from 'antd';
import { useMemo } from 'react';

const { TabPane } = Tabs;

enum Path {
  Home,
  Detail,
}

export function App() {
  const { pathname } = useLocation();

  const defaultActiveKey = useMemo(() => {
    const key = pathname
      .slice(1)
      .replace(/^\S/, (s) => s.toUpperCase()) as keyof typeof Path;
    return typeof Path[key] === 'number' ? Path[key].toString() : '0';
  }, []);

  return (
    <div className={styles['app']}>
      <Tabs defaultActiveKey={defaultActiveKey}>
        <TabPane tab={<Link to="/home">Home Page</Link>} key={Path.Home}>
          <Home />
        </TabPane>
        <TabPane tab={<Link to="/detail">Detail Page</Link>} key={Path.Detail}>
          <Detail />
        </TabPane>
      </Tabs>

      <Route exact path="/">
        <Redirect to="/home" />
      </Route>
    </div>
  );
}

export default App;
