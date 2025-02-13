import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector ";
import { newCurrencyCode } from "../../Store/Slices/profileSlice";

function ItemsCurrency(props: { currenciesCodes: string[] }) {
  const { currenciesCodes } = props;
  const currencyCode = useAppSelector((state) => state.profile.currencyCode);
  const dispatch = useAppDispatch();

  return (
    <select
      value={currencyCode}
      onChange={(e) => dispatch(newCurrencyCode(e.target.value))}
      className="currency-select">
      <option value={"PLN"}>PLN</option>
      {currenciesCodes.map((currCode) => {
        return (
          <option key={currCode} value={currCode}>
            {currCode}
          </option>
        );
      })}
    </select>
  );
}

export default ItemsCurrency;
