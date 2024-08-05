import {
  Page,
} from "@shopify/polaris";
import {
  useNavigate
} from "@shopify/app-bridge-react";
import { isEmpty } from "lodash";

export default function HomePage({
  shop
}) {
  const navigate = useNavigate();

  if (isEmpty(shop?.subscription)) {
    navigate('/plans');
  }

  return (
    <Page narrowWidth>
    </Page>
  );
}
