import { Dialog, Portal, Button, Text, useTheme } from "react-native-paper";

export default function DeleteConfirmDialog({ visible, onDismiss, onConfirm }) {
  const theme = useTheme();

  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={onDismiss}
        style={{ backgroundColor: theme.colors.background, borderRadius: 12 }}
      >
        <Dialog.Title style={{ color: theme.colors.onBackground }}>
          Delete Transaction
        </Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium" style={{ color: theme.colors.onSurface }}>
            Are you sure you want to delete this transaction? This action cannot be undone.
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismiss} textColor={theme.custom.muted}>
            Cancel
          </Button>
          <Button onPress={onConfirm} textColor={theme.custom.expense}>
            Delete
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

