export type AreaPropsModel = {
  data: [string, number, string][];
  targetPrice: number;
  changeTargetPrice(e: number): void;
  width?: number;
  height?: number;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
};
