import {
  Button,
  BlockStack,
  Card,
  Divider,
  Grid,
  InlineStack,
  Layout,
  List,
  Page,
  ProgressBar,
  Text,
} from "@shopify/polaris";
import {
  useNavigate,
} from '@shopify/app-bridge-react';

export function Ready() {
  const navigate = useNavigate();

  return (
    <>
      <BlockStack align="center" inlineAlign="center" gap="500">
        <BlockStack align="center" inlineAlign="center" gap="200">
          <Text variant="headingXl" as="h4">Your are all set!</Text>
          <Text variant="headingMd" as="h6">Your are now ready to grow your brand with reviews</Text>
        </BlockStack>
        <InlineStack gap="400">
          <Card>
            <BlockStack gap="200">
              <Text>Ready to jump in?</Text>
              <Button variant="primary" size="large" onClick={() => navigate('/')}>Enter the admin</Button>
            </BlockStack>
          </Card>
          <Card>
            <BlockStack gap="200">
              <Text>Want to import reviews?</Text>
              <Button variant="primary" size="large" onClick={() => navigate('/reviews')}>Import now</Button>
            </BlockStack>
          </Card>
        </InlineStack>
      </BlockStack>
    </>
  )
}
