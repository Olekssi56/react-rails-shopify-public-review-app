import { useState, useCallback } from 'react';
import {
  Banner,
  BlockStack,
  Box,
  Card,
  Collapsible,
  DropZone,
  InlineGrid,
  InlineStack,
  Layout,
  Link,
  Page,
  Select,
  Tabs,
  Text,
} from '@shopify/polaris';
import {
  Toast,
} from "@shopify/app-bridge-react";
import { ChevronDownIcon, ChevronUpIcon } from '@shopify/polaris-icons';
import { v4 as uuidv4 } from 'uuid';
import Toggle from 'react-toggle';
import "react-toggle/style.css";
import { startImport } from "../apis";
import { useAuthenticatedFetch } from "../hooks";
import * as DigitalOcean  from "../utils/DigitalOcean";

const SHEET_URL = "https://docs.google.com/spreadsheets/d/1HLBZOoSAaoW5VRGf09IG0sRKJ21-keVWkWaJu2Aiavw/edit?usp=sharing";
const tabs = [
  {
    id: 'collect',
    content: 'Collect',
    accessibilityLabel: 'Collect',
    panelID: 'collect',
  },
  {
    id: 'display',
    content: 'Display',
    accessibilityLabel: 'Display',
    panelID: 'display',
  },
  {
    id: 'repeat-customers-1',
    content: 'Manage',
    accessibilityLabel: 'Manage',
    panelID: 'manage',
  },
  {
    id: 'import',
    content: 'Import',
    accessibilityLabel: 'Import',
    panelID: 'import',
  },
];

const collectSections = [
  {
    key: "manage_new_reviews",
    heading: "Managing new reviews",
    subheading: "Choose which reviews you want to auto publish and how you want to be notified of new reviews"
  },
  {
    key: "review_request_timing",
    heading: "Review request timing",
    subheading: "Set the timing of the first review request email sent to your customers"
  },
];

const widgets = [
  {
    key: "reviews_sidebar",
    heading: "Reviews Sidebar Widget",
    description: "Give your visitors easy access to all of your store's reviews by clicking a tab on the side of their screen."
  },
];

const importSections = [
  {
    key: "spreadsheet",
    heading: "Import from a spreadsheet",
    subheading: "Follow these instructions to import reviews from a spreadsheet"
  },
];

export default function Reviews({shop}) {
  const fetch = useAuthenticatedFetch();
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [expanded, setExpanded] = useState({
    manage_new_reviews: false,
  });
  const [selected, setSelected] = useState('today');
  const options = [
    {label: 'Today', value: 'today'},
    {label: 'Yesterday', value: 'yesterday'},
    {label: 'Last 7 days', value: 'lastWeek'},
  ];
  // File Upload
  const [fileUploaded, setFileUploaded] = useState(false);
  const [files, setFiles] = useState([]);
  const [rejectedFiles, setRejectedFiles] = useState([]);
  const hasError = rejectedFiles.length > 0;
  // Toast
  const emptyToastProps = { content: null };
  const [toastProps, setToastProps] = useState(emptyToastProps);

  const handleTabChange = useCallback(
    (newSelectedTabIndex) => setSelectedTabIndex(newSelectedTabIndex),
    [],
  );
  const handleFileUpload = useCallback(
    async (_dropFiles, acceptedFiles, rejectedFiles) => {
      setFiles((files) => [...files, ...acceptedFiles]);
      setRejectedFiles(rejectedFiles);
      if (acceptedFiles && acceptedFiles[0]) {
        const blob = acceptedFiles[0];
        const key = `${uuidv4()}-${blob.name}`;
        const params = {
          Body: blob, 
          Bucket: `${DigitalOcean.config.bucketName}`, 
          Key: key,
          ACL: 'public-read',
          ContentType: blob.type,
          ContentLength: blob.size
        };
  
        setFileUploaded(false);
        // Sending the file to the Spaces
        try {
          DigitalOcean.s3.putObject(params)
          const fileUrl = DigitalOcean.config.digitalOceanSpaces + key;
          console.log(fileUrl);
          setFileUploaded(true);
          setToastProps({content: "File uploaded"});
          startImport(fetch, { file_name: key });
        } catch (err) {
          console.log(err);
          setToastProps({
            content: "There was an error uploading file",
            error: true,
          });
        }
      }
    },
    [],
  );

  const toastMarkup = toastProps.content && (
    <Toast {...toastProps} onDismiss={() => setToastProps(emptyToastProps)} />
  );
  const manageNewReviewsMarkup = (
    <BlockStack gap="200">
      <InlineStack gap="200" blockAlign="center">
        <Toggle
          checked={true}
          className="toggle"
          icons={false}
          disabled={false}
          onChange={(e) => {}}
        />
        <Text>Auto-publish new reviews</Text>
      </InlineStack>

      <InlineStack gap="200" blockAlign="center">
        <Toggle
          checked={true}
          className="toggle"
          icons={false}
          disabled={false}
          onChange={(e) => {}}
        />
        <Text>Review notifications</Text>
      </InlineStack>

      <InlineStack gap="200" blockAlign="center">
        <Toggle
          checked={true}
          className="toggle"
          icons={false}
          disabled={false}
          onChange={(e) => {}}
        />
        <Text>Add onsite reviewers to Shopify Customers list</Text>
      </InlineStack>
    </BlockStack>
  );
  const reviewRequestTimingMarkup = (
    <BlockStack gap="200">
      <InlineStack gap="200" blockAlign="center">
        <Text>Email in</Text>
        <Select
          options={options}
          onChange={() => {}}
          value={selected}
        />
        <Text>after</Text>
        <Select
          options={options}
          onChange={() => {}}
          value={selected}
        />
      </InlineStack>
    </BlockStack>
  );
  const collectTabMarkup = (
    <BlockStack gap="400">
      {
        collectSections.map((section) => {
          const { key, heading, subheading } = section;

          return (
            <Card key={section.key}>
              <Box>
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    return setExpanded((prev) => ({...prev, [key]: !prev[key]}));
                  }}
                >
                  <InlineStack align='space-between' blockAlign='center'>
                    <BlockStack gap="200">
                      <Text variant="headingMd" as="h2">{heading}</Text>
                      <Text variant="headingSm" as="h3">{subheading}</Text>
                    </BlockStack>
                    {expanded[key] ? (
                      <ChevronUpIcon width="24px" height="24px" />
                    ) : (
                      <ChevronDownIcon width="24px" height="24px" />
                    )}
                  </InlineStack>
                </div>
              </Box>
              <Collapsible open={expanded[key]}>
                <Box paddingBlockStart={400}>
                  {key === "manage_new_reviews" && manageNewReviewsMarkup}
                  {key === "review_request_timing" && reviewRequestTimingMarkup}
                </Box>
              </Collapsible>
            </Card>
          );
        })
      }
    </BlockStack>
  );
  const displayTabMarkup = (
    <BlockStack gap="400">
      <InlineGrid columns={4}>
        {
          widgets.map((widget) => {
            const { key, heading, description } = widget;

            return (
              <Card key={key}>
                <Text variant="headingMd">{heading}</Text>
                <Text variant="bodySm">{description}</Text>
              </Card>
            );
          })
        }
      </InlineGrid>
    </BlockStack>
  );
  const manageTabMarkup = (
    <></>
  );
  const fileUpload = (
    <DropZone
      allowMultiple={false}
      accept=".csv"
      type="csv"
      errorOverlayText="File type must be .svg"
      onDrop={handleFileUpload}
    >
      <DropZone.FileUpload actionTitle="Upload template file" />
    </DropZone>
  );
  const fileUploadResult = fileUploaded && (
    <Banner
      title="Your file was uploaded!"
      tone="info"
      onDismiss={() => setFileUploaded(false)}
    >
      <p>We'll email {shop?.customer_email} once the process is complete.</p>
    </Banner>
  );
  const errorMessage = hasError && (
    <Banner title="The following images couldn’t be uploaded:" tone="critical">
      <List type="bullet">
        {rejectedFiles.map((file, index) => (
          <List.Item key={index}>
            {`"${file.name}" is not supported. File type must be .svg.`}
          </List.Item>
        ))}
      </List>
    </Banner>
  );
  const spreadsheetMarkup = files.length
    ? fileUploadResult
    : (
      <BlockStack gap="200">
        <Text>1. Copy <Link url={SHEET_URL} target="_blank">template file</Link></Text>
        <Text>2. Upload template file</Text>
        {errorMessage}
        {fileUpload}
      </BlockStack>
    );
  const importTabMarkup = importSections.map((section) => {
    const { key, heading, subheading } = section;

    return (
      <Card key={section.key}>
        <Box>
          <div
            style={{ cursor: "pointer" }}
            onClick={() => {
              return setExpanded((prev) => ({...prev, [key]: !prev[key]}));
            }}
          >
            <InlineStack align='space-between' blockAlign='center'>
              <BlockStack gap="200">
                <Text variant="headingMd" as="h2">{heading}</Text>
                <Text variant="headingSm" as="h3">{subheading}</Text>
              </BlockStack>
              {expanded[key] ? (
                <ChevronUpIcon width="24px" height="24px" />
              ) : (
                <ChevronDownIcon width="24px" height="24px" />
              )}
            </InlineStack>
          </div>
        </Box>
        <Collapsible open={expanded[key]}>
          <Box paddingBlockStart={400}>
            {key === "spreadsheet" && spreadsheetMarkup}
          </Box>
        </Collapsible>
      </Card>
    );
  });
  const pageMarkup = (
    <Page title="Reviews" fullWidth>
      <Layout>
        {toastMarkup}
        <Layout.Section>
          <Card>
            <Tabs tabs={tabs} selected={selectedTabIndex} onSelect={handleTabChange}>
              {selectedTabIndex === 0 && collectTabMarkup}
              {selectedTabIndex === 1 && displayTabMarkup}
              {selectedTabIndex === 2 && manageTabMarkup}
              {selectedTabIndex === 3 && importTabMarkup}
            </Tabs>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );

  return (
    <>
      {pageMarkup}
    </>
  );
}