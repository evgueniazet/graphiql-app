import styles from './DocSection.module.scss';
import RenderFields from './RenderFields';
import { GraphQLSchemaIntrospection } from './interfaces';

type DocSectionProps = {
  schemaData: GraphQLSchemaIntrospection;
};

const DocSection: React.FC<DocSectionProps> = ({ schemaData }) => {
  const rootType = schemaData.__schema.queryType;
  const rootFields =
    schemaData.__schema.types.find((type) => type.name === rootType.name)
      ?.fields || [];

  return (
    <div className={styles.docSection_wrapper}>
      <h3 className={styles.heading}>Documentation</h3>
      <h4 className={styles.heading5}>Root Types</h4>
      <div>
        <strong>query:</strong> {rootType.name}
      </div>
      <h4 className={styles.heading5}>Fields</h4>
      <RenderFields fields={rootFields} schemaData={schemaData} />
    </div>
  );
};

export default DocSection;
