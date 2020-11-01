export interface Props {
  setEncKey: React.Dispatch<
    React.SetStateAction<{
      key: string;
      enabled: boolean;
    }>
  >;
  encKey: {
    key: string;
    enabled: boolean;
  };
}
