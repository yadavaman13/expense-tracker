import { ScrollView, StyleSheet } from "react-native";
import { Chip, useTheme } from "react-native-paper";

export default function CategoryPicker({ categories, selected, onSelect }) {
  const theme = useTheme();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {categories.map((category) => {
        const isSelected = selected === category;
        return (
          <Chip
            key={category}
            selected={isSelected}
            onPress={() => onSelect(category)}
            style={[
              styles.chip,
              {
                backgroundColor: isSelected
                  ? theme.colors.primary
                  : theme.colors.surface,
              },
            ]}
            textStyle={{
              color: isSelected
                ? theme.colors.onPrimary
                : theme.colors.onSurface,
              fontSize: 13,
            }}
            showSelectedCheck={false}
          >
            {category}
          </Chip>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
  },
  chip: {
    marginRight: 6,
    borderRadius: 20,
  },
});

