import type { FC } from 'react';

const Title: FC = () => {
  return (
    <div className="flex-1">
      <a className="bg-bg mr-4 ml-2 text-lg" href="#">
        Particle System with <strong>React</strong>
      </a>
      <span className="badge badge-xs badge-outline badge-success mr-1">QuadTree</span>
      <span className="badge badge-xs badge-outline badge-info ml-1">@Decorator</span>
    </div>
  );
};

export default Title;
