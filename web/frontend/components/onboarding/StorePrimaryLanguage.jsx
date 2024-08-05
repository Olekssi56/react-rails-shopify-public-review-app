import { useState } from "react";
import {
  Button,
  BlockStack,
  Card,
  Divider,
  Grid,
  Layout,
  List,
  Page,
  ProgressBar,
  Select,
  Text,
} from "@shopify/polaris";

export function StorePrimaryLanguage() {
  const languages = [
    {label: 'English', value: 'english'},
  ];

  return (
    <>
      <BlockStack align="center" inlineAlign="center" gap="200">
        <Text variant="headingXl" as="h4">What's your store's primary language</Text>
        <Text variant="headingMd" as="h6">We will use this lanuage for your widgets and emails</Text>
        <div style={{width: '40%'}}>
          <Select
            options={languages}
            disabled
          />
        </div>
      </BlockStack>
    </>
  )
}
