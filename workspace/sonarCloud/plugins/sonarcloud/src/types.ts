export interface UptimeCardProps {
    title: string;
  }
  
  export interface Measure {
    metric: string;
    value: string;
    bestValue: boolean;
  }
  
  export interface Component {
    id: string;
    key: string;
    name: string;
    qualifier: string;
    measures: Measure[];
  }
  
  export interface Project {
    key: string;
    metrics: {
      component: Component;
    };
  }

  export interface DataPoint {
    name: string;
    uv: number;
    color: string;
  }