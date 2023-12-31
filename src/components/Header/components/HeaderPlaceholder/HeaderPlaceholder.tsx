interface HeaderPlaceholderProps {
  isVisible: boolean;
}

const HeaderPlaceholder: React.FC<HeaderPlaceholderProps> = ({ isVisible }) => (
  isVisible ? <div style={{ height: '104px', width: '100%' }}></div> : null
);

export default HeaderPlaceholder;