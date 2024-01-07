import { GraphQLSchema, isObjectType } from 'graphql';
import styles from './DocSection.module.scss';
import RenderFields from './RenderFields';
import { useLanguage } from '../../../../context/LanguageContext/LanguageContext';
import { getMainText } from '../../../../utils/getTexts';

type DocSectionProps = {
  schemaAST: GraphQLSchema;
};

const DocSection: React.FC<DocSectionProps> = ({ schemaAST }) => {
  const rootTypes = [
    schemaAST.getQueryType(),
    schemaAST.getMutationType(),
    schemaAST.getSubscriptionType(),
  ].filter(Boolean);

  const { language } = useLanguage();

  const mainText = getMainText(language || 'en');

  return (
    <div className={styles.docSection_wrapper}>
      <h3 className={styles.heading}>{mainText.doc}</h3>
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
