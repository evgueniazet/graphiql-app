import styles from './DocSection.module.scss';

const DocSection = ({ schemaData }) => {
  return (
    <div className={styles.docSection_wrapper}>
      <h3 className={styles.heading}>Documentation</h3>
      <pre>{JSON.stringify(schemaData, null, 2)}</pre>
    </div>
  )
};

export default DocSection;
