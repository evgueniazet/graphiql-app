import { useState } from 'react';
import TypeLink from './TypeLink';
import styles from './RenderFields.module.scss';
import {
  GraphQLArgument,
  GraphQLField,
  isObjectType,
} from 'graphql';

interface RenderFieldsProps {
  fields: Record<string, GraphQLField<unknown, unknown>>;
}

const RenderFields: React.FC<RenderFieldsProps> = ({ fields }) => {
  const [selectedField, setSelectedField] = useState<string | null>(null);

  const handleFieldClick = (fieldName: string) => {
    setSelectedField(selectedField === fieldName ? null : fieldName);
  };

  return (
    <ul>
      {Object.keys(fields).map((fieldName) => {
        const field = fields[fieldName];
        return (
          <li
            key={fieldName}
            className={styles.li}
            onClick={() => handleFieldClick(fieldName)}
          >
            <strong>{fieldName}</strong>: <TypeLink type={field.type} />
            {selectedField === fieldName && field.args && (
              <>
                {field.args && (
                  <div className={styles.fields}>
                    <strong>Arguments:</strong>
                    <ul>
                      {field.args.map((arg: GraphQLArgument) => (
                        <li key={arg.name}>
                          {arg.name} - <TypeLink type={arg.type} />
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {isObjectType(field.type) && (
                  <div className={styles.fields}>
                    <strong>Fields:</strong>
                    <RenderFields fields={field.type.getFields()} />
                  </div>
                )}
              </>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default RenderFields;
