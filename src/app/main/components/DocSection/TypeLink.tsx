import { GraphQLFieldType } from './interfaces';

interface TypeLinkProps {
  type: GraphQLFieldType;
}

const TypeLink: React.FC<TypeLinkProps> = ({ type }) => {
  if (!type) return null;

  if (type.ofType) {
    return (
      <span>
        {type.kind === 'LIST' ? '[' : ''}
        <TypeLink type={type.ofType} />
        {type.kind === 'LIST' ? ']' : ''}
      </span>
    );
  }

  return <span>{type.name}</span>;
};

export default TypeLink;
