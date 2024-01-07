import { GraphQLType, isListType, isNamedType, isNonNullType } from 'graphql';

interface TypeLinkProps {
  type: GraphQLType;
}

const TypeLink: React.FC<TypeLinkProps> = ({ type }) => {
  if (!type) return null;

  const renderTypeName = (type: GraphQLType): string => {
    if (isNonNullType(type)) {
      return `${renderTypeName(type.ofType)}`;
    } else if (isListType(type)) {
      return `[${renderTypeName(type.ofType)}]`;
    } else if (isNamedType(type)) {
      return type.name;
    }
    return '';
  };

  return <span>{renderTypeName(type)}</span>;
};

export default TypeLink;
