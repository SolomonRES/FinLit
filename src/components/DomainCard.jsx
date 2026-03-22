import React, { useState, useRef, useEffect } from 'react';
import { Building2, BarChart2, Package, DollarSign, Home, Shield, ChevronDown } from 'lucide-react';
import ModuleItem from './ModuleItem';

const DOMAIN_ICONS = {
  ib: <Building2 strokeWidth={2} />,
  cm: <BarChart2 strokeWidth={2} />,
  am: <Package strokeWidth={2} />,
  cf: <DollarSign strokeWidth={2} />,
  re: <Home strokeWidth={2} />,
  ir: <Shield strokeWidth={2} />,
};

function DomainCard({ domainName, domainKey, modules, isFirst }) {
  const [isOpen, setIsOpen] = useState(isFirst);
  const modulesRef = useRef(null);

  const completedCount = modules.filter(m => m.status === 'completed').length;
  const pct = Math.round((completedCount / modules.length) * 100);

  useEffect(() => {
    if (modulesRef.current) {
      if (isOpen) {
        modulesRef.current.style.maxHeight = modulesRef.current.scrollHeight + 'px';
      } else {
        modulesRef.current.style.maxHeight = '0px';
      }
    }
  }, [isOpen]);

  const handleToggle = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <div className="domain-card" data-domain={domainKey}>
      <button className="domain-header" aria-expanded={isOpen ? 'true' : 'false'} onClick={handleToggle}>
        <div className="domain-header-left">
          <div className="domain-icon">{DOMAIN_ICONS[domainKey] || DOMAIN_ICONS.ib}</div>
          <div className="domain-info">
            <h3 className="domain-title">{domainName}</h3>
            <div className="domain-meta">
              <span>{modules.length} module{modules.length !== 1 ? 's' : ''}</span>
              <span className="meta-dot">&bull;</span>
              <span>{pct}% complete</span>
            </div>
          </div>
        </div>
        <div className="domain-header-right">
          <div className="domain-progress-bar">
            <div className="domain-progress-fill" style={{ width: pct + '%' }}></div>
          </div>
          <ChevronDown className="domain-chevron" strokeWidth={2} />
        </div>
      </button>
      <div
        className={`domain-modules${isOpen ? ' open' : ''}`}
        ref={modulesRef}
        style={{ maxHeight: isFirst ? undefined : '0px' }}
      >
        <div className="domain-modules-inner">
          {modules.map(mod => (
            <ModuleItem key={mod._id} mod={mod} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default DomainCard;
