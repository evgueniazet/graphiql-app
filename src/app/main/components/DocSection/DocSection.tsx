import styles from './DocSection.module.scss';
import RenderSchema from './RenderSchema';

type DocSchemaProps<T> = {
  schemaData: T;
};

const DocSection = <T,>({ schemaData }: DocSchemaProps<T>) => {
  return (
    <div className={styles.docSection_wrapper}>
      <h3 className={styles.heading}>Documentation</h3>
      <RenderSchema data={schemaData} />
    </div>
  );
};

export default DocSection;
