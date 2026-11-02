import { useState } from "react";
import { View, ScrollView, StyleSheet, Platform, Pressable } from "react-native";
import {
  Text,
  TextInput,
  Button,
  SegmentedButtons,
  useTheme,
  HelperText,
} from "react-native-paper";
import { router } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Haptics from "expo-haptics";
import { SafeAreaView } from "react-native-safe-area-context";
import useTransactionStore from "../../src/store/useTransactionStore";
import CategoryPicker from "../../src/components/CategoryPicker";
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from "../../src/constants/categories";
import { formatDate } from "../../src/utils/formatters";

const TYPE_BUTTONS = [
  { value: "expense", label: "Expense" },
  { value: "income", label: "Income" },
];

export default function AddTransactionScreen() {
  const theme = useTheme();
  const addTransaction = useTransactionStore((state) => state.addTransaction);

  const [type, setType] = useState("expense");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [errors, setErrors] = useState({});

  const categories = type === "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  const handleTypeChange = (newType) => {
    setType(newType);
    setCategory("");
  };

  const validate = () => {
    const newErrors = {};

    if (!amount || parseFloat(amount) <= 0) {
      newErrors.amount = "Amount must be greater than 0";
    }
    if (isNaN(parseFloat(amount))) {
      newErrors.amount = "Enter a valid number";
    }
    if (!category) {
      newErrors.category = "Select a category";
    }
    if (description.length > 100) {
      newErrors.description = "Description too long (max 100 characters)";
    }

    const today = new Date();
    today.setHours(23, 59, 59, 999);
    if (date > today) {
      newErrors.date = "Date cannot be in the future";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;

    addTransaction({
      type,
      amount: parseFloat(amount),
      category,
      description: description.trim(),
      date: date.toISOString().split("T")[0],
    });

    try {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch (e) {
      // Haptics might fail silently on unsupported platforms (web/simulator)
    }
    router.back();
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === "ios");
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.background }]}>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} hitSlop={16}>
            <Text variant="bodyLarge" style={{ color: theme.colors.onBackground }}>
              ← Back
            </Text>
          </Pressable>
          <Text variant="headlineSmall" style={{ color: theme.colors.onBackground, fontWeight: "bold" }}>
            Add Transaction
          </Text>
        </View>

        {/* Type Selector */}
        <View style={styles.section}>
          <Text variant="bodyMedium" style={[styles.label, { color: theme.colors.onSurface }]}>
            Type
          </Text>
          <SegmentedButtons
            value={type}
            onValueChange={handleTypeChange}
            buttons={TYPE_BUTTONS}
            theme={{
              colors: {
                secondaryContainer: type === "income" ? theme.custom.income : theme.custom.expense,
                onSecondaryContainer: "#FFFFFF",
              },
            }}
          />
        </View>

        {/* Amount */}
        <View style={styles.section}>
          <TextInput
            label="Amount"
            value={amount}
            onChangeText={(text) => {
              setAmount(text);
              if (errors.amount) setErrors({ ...errors, amount: undefined });
            }}
            keyboardType="decimal-pad"
            mode="outlined"
            left={<TextInput.Affix text="₹" />}
            error={!!errors.amount}
            outlineColor={theme.colors.outline}
            activeOutlineColor={theme.colors.primary}
            style={{ backgroundColor: theme.colors.background }}
          />
          {errors.amount ? (
            <HelperText type="error" visible>{errors.amount}</HelperText>
          ) : null}
        </View>

        {/* Category */}
        <View style={styles.section}>
          <Text variant="bodyMedium" style={[styles.label, { color: theme.colors.onSurface }]}>
            Category
          </Text>
          <CategoryPicker
            categories={categories}
            selected={category}
            onSelect={(cat) => {
              setCategory(cat);
              if (errors.category) setErrors({ ...errors, category: undefined });
            }}
          />
          {errors.category ? (
            <HelperText type="error" visible style={{ paddingHorizontal: 16 }}>
              {errors.category}
            </HelperText>
          ) : null}
        </View>

        {/* Date */}
        <View style={styles.section}>
          <Text variant="bodyMedium" style={[styles.label, { color: theme.colors.onSurface }]}>
            Date
          </Text>
          <Pressable
            onPress={() => setShowDatePicker(true)}
            style={[styles.dateButton, { backgroundColor: theme.colors.surface, borderColor: theme.colors.outline }]}
          >
            <Text variant="bodyLarge" style={{ color: theme.colors.onBackground }}>
              {formatDate(date.toISOString().split("T")[0])}
            </Text>
          </Pressable>
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={handleDateChange}
              maximumDate={new Date()}
            />
          )}
          {errors.date ? (
            <HelperText type="error" visible>{errors.date}</HelperText>
          ) : null}
        </View>

        {/* Description */}
        <View style={styles.section}>
          <TextInput
            label="Description (optional)"
            value={description}
            onChangeText={(text) => {
              setDescription(text);
              if (errors.description) setErrors({ ...errors, description: undefined });
            }}
            mode="outlined"
            maxLength={100}
            outlineColor={theme.colors.outline}
            activeOutlineColor={theme.colors.primary}
            style={{ backgroundColor: theme.colors.background }}
            error={!!errors.description}
          />
          <HelperText type={errors.description ? "error" : "info"} visible>
            {errors.description || `${description.length}/100`}
          </HelperText>
        </View>

        {/* Save Button */}
        <View style={styles.section}>
          <Button
            mode="contained"
            onPress={handleSave}
            style={styles.saveButton}
            contentStyle={styles.saveButtonContent}
            labelStyle={{ fontSize: 16, fontWeight: "600" }}
          >
            Save Transaction
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    padding: 16,
    paddingBottom: 40,
  },
  header: {
    gap: 12,
    marginBottom: 24,
  },
  section: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 8,
    fontWeight: "500",
  },
  dateButton: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  saveButton: {
    borderRadius: 12,
    marginTop: 8,
  },
  saveButtonContent: {
    paddingVertical: 8,
  },
});

