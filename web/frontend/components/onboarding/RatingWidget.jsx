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
  Text,
} from "@shopify/polaris";

export function RatingWidget() {
  return (
    <Grid>
      <Grid.Cell columnSpan={{xs: 6, sm: 3, md: 3, lg: 6, xl: 6}}>
        <Text>Add the Rating Widget to your store</Text>
        <Text>To display your ratings, follow these steps</Text>
        <List type="number">
          <List.Item>Click on the button below</List.Item>
          <List.Item>Place the widget where you would like it to appear</List.Item>
          <List.Item>Click "Save"</List.Item>
        </List>
      </Grid.Cell>
      <Grid.Cell columnSpan={{xs: 6, sm: 3, md: 3, lg: 6, xl: 6}}>
      </Grid.Cell>
    </Grid>
  )
}
