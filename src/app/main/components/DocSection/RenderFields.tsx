import { useState } from 'react';
import TypeLink from './TypeLink';
import {
  GraphQLField,
  GraphQLSchemaIntrospection,
  GraphQLType,
} from './interfaces';
import styles from './RenderFields.module.scss';

interface RenderFieldsProps {
  fields: GraphQLField[];
  schemaData: GraphQLSchemaIntrospection;
}

interface FieldType {
  name: string;
  type: {
    name?: string;
    fields?: GraphQLField[];
  };
}

const RenderFields: React.FC<RenderFieldsProps> = ({ fields, schemaData }) => {
  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [fieldDetails, setFieldDetails] = useState<GraphQLType | null>(null);

  const handleFieldClick = async (field: FieldType) => {
    if (selectedField === field.name) {
      setSelectedField(null);
      setFieldDetails(null);
    } else {
      setSelectedField(field.name);
      const details =
        schemaData.__schema.types.find(
          (type) => type.name === field.type.name
        ) ?? null;
      setFieldDetails(details);
    }
  };

  return (
    <ul>
      {fields.map((field) => (
        <li
          key={field.name}
          className={styles.li}
          onClick={() => handleFieldClick(field)}
        >
          <strong>{field.name}</strong>: <TypeLink type={field.type} />
          {selectedField === field.name && fieldDetails && (
            <ul>
              {fieldDetails.fields && (
                <div>
                  <strong>Fields:</strong>
                  <ul>
                    {fieldDetails.fields.map((detailField) => (
                      <li key={detailField.name}>{detailField.name}</li>
                    ))}
                  </ul>
                </div>
              )}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
};

export default RenderFields;
