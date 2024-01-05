type RenderSchemaProps<T> = {
  data: T;
};

const RenderSchema = <T,>({ data }: RenderSchemaProps<T>) => {
  if (typeof data === 'object' && data !== null) {
    return (
      <ul>
        {Object.entries(data).map(([key, value]) => (
          <li key={key}>
            <strong>{key}</strong>: <RenderSchema data={value} />
          </li>
        ))}
      </ul>
    );
  } else {
    return <span>{String(data)}</span>;
  }
};

export default RenderSchema;
