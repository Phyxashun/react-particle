import React from 'react';
import { useDisplay } from './DisplayContext';

const DisplayToggle: React.FC = () => {
  const { showQt, showRadius, showLinks, setShowQt, setShowRadius, setShowLinks } = useDisplay();

  return (
    <>
      <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-64 border p-4">
        <legend className="fieldset-legend mt-2 text-[10px] tracking-[0.15em] text-teal-600 uppercase">
          <strong>Display Toggle</strong>
        </legend>
        <label className={`label toggle-row ${showQt ? 'is-on' : ''}`}>
          <span className="toggle-label">Show QuadTree</span>
          <input type="checkbox" checked={showQt} onChange={() => setShowQt(!showQt)} className="toggle toggle-info" />
        </label>
        <label className={`label toggle-row ${showRadius ? 'is-on' : ''}`}>
          <span className="toggle-label">Show Radius</span>
          <input
            type="checkbox"
            checked={showRadius}
            onChange={() => setShowRadius(!showRadius)}
            className="toggle toggle-info"
          />
        </label>
        <label className={`label toggle-row ${showLinks ? 'is-on' : ''}`}>
          <span className="toggle-label">Trail / Links</span>
          <input
            type="checkbox"
            checked={showLinks}
            onChange={() => setShowLinks(!showLinks)}
            className="toggle toggle-info"
          />
        </label>
      </fieldset>
    </>
  );
};

export default DisplayToggle;
