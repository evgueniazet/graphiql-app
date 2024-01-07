import { GraphQLSchema, isObjectType } from 'graphql';
import styles from './DocSection.module.scss';
import RenderFields from './RenderFields';

type DocSectionProps = {
  schemaAST: GraphQLSchema;
};

const DocSection: React.FC<DocSectionProps> = ({ schemaAST }) => {
  const rootTypes = [
    schemaAST.getQueryType(),
    schemaAST.getMutationType(),
    schemaAST.getSubscriptionType(),
  ].filter(Boolean);

  return (
    <div className={styles.docSection_wrapper}>
      <h3 className={styles.heading}>Documentation</h3>
      {rootTypes.map(
        (type) =>
          type && (
            <div key={type.name}>
              <h4 className={styles.heading5}>{type.name} Type</h4>
              {isObjectType(type) && <RenderFields fields={type.getFields()} />}
            </div>
          )
      )}
    </div>
  );
};

export default DocSection;
