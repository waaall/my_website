import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  // narrow: 文章宽 680px；wide: 列表 / 工具页 920px
  width?: 'narrow' | 'wide';
  className?: string;
}

// 统一的窄栏容器
export const Container: React.FC<ContainerProps> = ({ children, width = 'narrow', className }) => {
  const max = width === 'narrow' ? 'var(--content-max)' : 'var(--wide-max)';
  return (
    <div
      className={className}
      style={{
        maxWidth: max,
        margin: '0 auto',
        padding: '0 var(--side-pad)',
        width: '100%',
      }}
    >
      {children}
    </div>
  );
};
