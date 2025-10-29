import React from 'react';
import {
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BarChart } from 'react-native-chart-kit';
import { StatusBar } from 'expo-status-bar';

const stats = [
  {
    label: 'diet-related deaths/yr',
    value: '7.94M',
    source: 1,
  },
  {
    label: 'adults with diabetes',
    value: '589M',
    source: 2,
  },
  {
    label: 'adults with hypertension',
    value: '1.4B',
    source: 3,
  },
  {
    label: 'people facing hunger (2024)',
    value: '673M',
    source: 4,
  },
];

const sources = [
  {
    id: 1,
    label:
      'The Lancet – Global Burden of Disease study (2019), poor diet linked to ~7.94 million deaths/year',
    url: 'https://www.eurekalert.org/news-releases/879222',
  },
  {
    id: 2,
    label: 'IDF Diabetes Atlas (11th ed., 2025), global diabetes prevalence: 589 million adults',
    url: 'https://idf.org/aboutdiabetes/what-is-diabetes/facts-figures.html',
  },
  {
    id: 3,
    label: 'WHO Global Hypertension Report (2025), high blood pressure affects ~1.4 billion adults',
    url: 'https://www.who.int/publications/i/item/9789240076456',
  },
  {
    id: 4,
    label:
      'UN FAO – State of Food Security and Nutrition in the World 2025, ~673 million people faced hunger in 2024',
    url: 'https://www.fao.org/publications/sofi/en/',
  },
  {
    id: 5,
    label:
      'Our World in Data (IHME GBD 2021), protein-energy malnutrition causes ~0.2–0.25 million deaths annually',
    url: 'https://ourworldindata.org/grapher/deaths-protein-energy-malnutrition',
  },
];

const chartMetrics = [
  { label: 'Diet-related deaths/yr', value: 7940000, color: '#4e79a7' },
  { label: 'Adults with diabetes', value: 589000000, color: '#59a14f' },
  { label: 'Adults with hypertension', value: 1400000000, color: '#f28e2b' },
  { label: 'People facing hunger (2024)', value: 673000000, color: '#e15759' },
  { label: 'Deaths from malnutrition', value: 200000, color: '#76b7b2' },
];

const chartData = {
  labels: chartMetrics.map((metric) => metric.label),
  datasets: [
    {
      data: chartMetrics.map((metric) => Math.log10(metric.value)),
      colors: chartMetrics.map((metric) => () => metric.color),
    },
  ],
};

const chartConfig = {
  backgroundColor: '#121212',
  backgroundGradientFrom: '#121212',
  backgroundGradientTo: '#121212',
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(204, 204, 204, ${opacity})`,
  fillShadowGradientFrom: '#4e79a7',
  fillShadowGradientFromOpacity: 1,
  fillShadowGradientTo: '#4e79a7',
  fillShadowGradientToOpacity: 1,
  propsForBackgroundLines: {
    strokeDasharray: '',
    stroke: 'rgba(255, 255, 255, 0.1)',
  },
  decimalPlaces: 0,
};

const formatCompactValue = (value) => {
  if (value >= 1e9) {
    return `${(value / 1e9).toFixed(value % 1e9 === 0 ? 0 : 1)}B`;
  }
  if (value >= 1e6) {
    return `${(value / 1e6).toFixed(value % 1e6 === 0 ? 0 : 1)}M`;
  }
  if (value >= 1e3) {
    return `${(value / 1e3).toFixed(value % 1e3 === 0 ? 0 : 1)}K`;
  }
  return `${Math.round(value)}`;
};

const prototypeImage =
  'data:image/png;base64,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U356le/ym9/+9uZNm1aPvaxj0sXF+e9733PSy+9tNQZI0aMqLe3NwMGDShqair777rv8x3/8B8OGDYvakSNGZPbsmTt37qxevTrPPPOMfOQjH2lra8uFF16YfffdlzZt2ogRI1KcnJxcccUVmT59er766qty5513ZtCgQZk4cWKefPLJvOUtb8nU1FSWLl1a8+bN2xlvrS4uTtdee22efvppw+FQqampyR/84AebMmVKbm5vT1NRkZ2ezdevWZGdnJ729vUmS9PX15c0332zWrl3LhAkT8uEPf5idTkdHR+vXr1/8+7/+K3PmzMn06dNz0kknZfjw4TTfemH//mfzk5/8JD179mxqa2vT0dGRv/zlL+nt7Zl165ZWVFTooIMOyC233JLKysq0tbWlq6uLo446KlOnTqVfv36efPLJvPrVr8ull15KY2Mj5s+fT3t7e2bMmKGnp6eWLFmS888/P+PGjZMk/fr1PPnkkznooIPyvve9L3Xq1JHj8Y53vCFOPvnk/OQnP8moUaOyb9++HBwcrNVqNWnSpPz2t7+dr7/++rRNnz7d8PBwdO7cOd/61rcav/71r+XGG29kr732yrx27dpk165d6enpMnbsWPHhhx9m8ODBnH/++Rk4cGDGjBlTUFBARETEpZdemnPOOSf7+/uXLl+etrc3iY6OZu+995Z+/fp86lOfyuzZs+fca5MmTZpjjjkmmzdvTmJiYpIkg/nTp0/Oxz/+sYwdOzZz5szJsmVLfvCDH8To0aPz5je/2aRJk/KFL3wh17721Zqamry6quv5pprrmnhwoV5+ctfJkmampr87Gc/yzZt2jS+853vZHPmzJg9e3Z+8Ytf5PXXX8+qVauykUceyWmnnZaVK1eumIyMjCye1OHDh/PSSy/NbrvtkuHDh6fZ2VnFxcU5c+YM8+eSTeuihh/J3f/M3761//Ws8991ySZKYvX17nnXde3nzzzRk1aFB+9KMfJPnz5+fSSy/N5MmT85Of/CRJMmDAgAwYMICTJ0/Wrl0bmzdvzgMPPJBkZWU57rjj0tbWFtOmTZt8+eWX5+STT85f//Vfdeedd2bBhAkvX748OzYsUfr06TP55JNzyy67ZNasWYvl5eU5c+ZM7Lfffvm4ceMydOjQfOITn8ivfvWr+eEPf5hjjjkmiYmJ+eY3v5nll18+5s+fn9LSUk888UQmTJiQb37zm/nKXv0ikpKTMm7cOOrVq5f+/Oc/5+tfn3/84x+zZMmS7Lvvvsu1115b1rC5c+fm0ksvzYIFC7J58+Y8/PDDmDt3LnvssUe+fft2fvrTn05tbW1qbm5OSktLkyT59re/Keutt5bzzjvP6aefnsceeyy9vb3p7u4mPT09atmyZZk4cWKioqJMq1at8uY3v5nvfve7OfXUU3PWWWflX//1X6WnpydPPvnkHHnkkUmS0dHR/OEf/gAVV1wROjo6vPrqq2nTpo3MnTs3DzzwQJramtLFF1/c4N998MMPx5IlS/L888/nN7/5TZKkF198sWHDhvnyl7+chQsX5pprrsnl5eX8zGc+cx122KE8+OCDc+ONN+auu+6axYsX56KOPzp133plLL720dLmtXr26bGho8q1vfSsXXHBBHnrooTnkkEPy6aefLoceeijPP/987LzzzvnUpz7V+eefn+KiopycnJSUlJeeSRR/LFL35x9913z69+9au56KKL8u677+b3v/99enp6cnJy8owzzthfTzzxxBx55JF5+OGH8+1vf9uJfi9evDh79uxcfvnlueyyy/LjH/94Lrvsslx33XX57ne/yzPPPJOrr7667LTTjtl3bp1ufjii3P11Vdn6dKlGTFiRL7+9a/ntttuS9OmTZk4cWKatWvXZunSpRk5cmTbbrvN2rVrM3fu3CTJ/Oc//8lJJ510UlVVVay++ebs27eP008/PZdeeikzZ86st956a9/5zndGvWfOnMnAgQMzY8aMoVRqWbr06JEk6dKl2WuvvSZJUlNTk5//+Z/lc5/7XM4888x86EMfyj333JPq6mq+9rWvZc2aNXn77bdz00035fbbb8/Wvf81f/exn+eQnP5njxo3L448/niuuuCIvfvGLPPPMM5k0aVJ+9KMfZf78+QwMDGR5eXnGjBlTfn4eeuihtLe3c+aZZ+auu+7K4MGDhY+GHH744brrpprWtrUnS0tLkyy+/rKvXrm2nT5/OqFGjMnToUGZmZnz961/N7bbbTv369STJzc3N+eY3v5mPfOQjeeyxx+TII4/Mo48+mmuuuQaxcuRI5OTmKjo6mXbu2TJ06Nfbee+8kSd/85jfZf//9mTVrVtra2tL9+7d83WveU3KysqSnp6dk5syZHDx4sKV69eqcccYZJk+eXG644YZcfPHF+eQnP8kkk0yS3XbbbQwePDhPP/30zJ8/P8OGDSsyMhKPPfZYfOITn8hmzZqVlltuSbNmzYrDw8P89Kc/nVtvvZXTTz99pkyZUr7zne9I/Pnz08SJE7N//36HDh3KbbfdljvvvDO/+tWv8q53vSs5OTkZHR1NrVu3btG8efPS09OTtra2OHTsWffbZZ0mS0Wi0Lrzwwnz5y1/OsmXLcv/++y9NmDAhJk+eXJMnT07Xr18/Hn300Yk2bdpUUlJS4uHhYdl1110TGRkZHD9+XMiUKdKFCxfm2muvzYABA/jxj3/KySefzLPPPpt77rlHc4vLy8v86le/yi9+8Yt59dVXkyQB+++/Po888kiWLl2aiIgISZKioqKIjY2VefPm5e67787xxx+fY445Jk444YQkyaRJkyQ9PT1ZsGBBBg0apJ133jnKlCkTe+21V+no6EiS5Jprrlk9e/b0rrvuEjfccIPWrFlTWltb09DQkG233TaZPXt2nHPNaWpqym9/+9u57bbbsoQTTsh1112XZcuW5Yc//GG+853v5O23385hwoQJ2W233Zaut9tqq63q2LFjNm3alFNOOaUUKiqKDDz44PvWpT+XIY489Npxzzjn59Kc/nRtvvJHttttu0rRp0zJp0qRVn/zJn9Tt2zdr165VWFgYli5dmsTERGR6ekpM2bMSGtra7NYLBYpKytz1lln5dJLL+XMM8/Mr33ta/nRj350N998M9dee22VlZWprq4uK1as0ObNm02y3XTTJEm9vb2cfvrpp3P22WeTJP369VNXV5cZM2Zk6dKliI+Pl+OOO65du3ZpwoQJGT16tGbMmJHh8XFlZ2fr3nvvbPLJJ3PRRRdlgQceyKuvvprAwECeeOKJ/OAHP0iSvOMd76hd77zn3HzzzZebNm2Ks7OzXHTRRVmxYkU5+eSTkyQ+Pv78/MaMGZOyZcs0NzcnTZs2tfmTz3zmMJMlUql8ff3v/7tZdddFHp6em0atVKf//3fyaJw+Gll14a5cuX55xzzslzzz2XO+64I66urj744ANJ0p07d+a6667L9OnTRwwYEFMnz49gwYNSV77ylfy1a9+N973vfaSmpqZ07NgR5ubmPPHEE7nvvvtKpVIp9fX1eeihh3LBBRfktVdeyXvvvZeZM2dO8/BHH51Ro0blwAMPzIknndTu/8Y3v5P3338+3vvWt6d///7s27ePY445Jm3atMmhQ4cyZcoUw8PDnHTSSUmSww8/nIqlUjk5Odltt91W9vZ2XnjhBVmzZk2SJPX19UmS0tPTufDCC3PjjTfmggUL8sa3vSm//etf06FDh2bKlCk5+eSTqytraWpqsmXL5vjjj8+//OUvJUm2bdumTZtWJk+eXJkzZ+aQQw6pZcuWVX5/Px/PqFGj0rx5cyYnJ2dz5szJrFmzWltbM+XKlUny8vI8/fTTedKJJ+ZPf/pT9PX15eDBg3P66afnq666aseOHXPJJZfkxhtvTNG/evXcfffddN9jR0dHSVL6+vrce++9qampSZLPPvtMtt122+To0aOzb968rFq1Knz961+np6dz7733Zt++fTnssMNyc3P5/e9/n+DBg/PUU09t83ngwIH54IMP5pprrlm+gw8+KDc3N5Ik2traXL58OWeccUamm26aT37yk3n66adHnYwYMUKS5OLFi+eqq65KktLS5Hnz5mXTpk3Lrl27vO51r8vy5cuzatWqTJcuXMivXr26efNm+vr64vjxo1Jkhx56KFMmTIlBQUFWr16dZ599tlMnz49li1blvPPP59DDz20QH6/t912W3V1dcmee+6avP7663P55Zfnv/7rv3L77bfn0Ucfnbnz5s3p6enJ6OgoFixYUCZMmFDlypV5+eWXM3ToUL7ykY+UnZ2dDBgwgI6Ozsnnzp2TiRMntH37drnsssvynW9+E9OnT8/UqVPS0dER73znO/T09GTMmDG5+OKLbSMX4dFHH51f/vKXefrpp1NbW5uVK1dmd3fHli1bkpOTkV/96lfl+eefr0cffTRp06apqalJv369Wr58uUkyX333ZeWlhrzuc99LoMHD17tT67YsCG33XbbfO5zn8vNN9+cq6++Okny8vL09vZmf/vSn+eAHPyhmzZqVvfffP8cdd1wOO+yw3HbbbUleXh72gw8+KP369ZPdunX56KOPzsyZM2fckYdHR/LFL35x3rx5+bGPf8xTTz01CQkJ1NVVde7cuZk8eXJeeOCB/Pqv/3rn+fwH/7wh5k1a1Yk6dKl6enpyR/+8IfcdddahQ4e2et/nzp2bQ4cOzZ8/Pwn98pe/nEMPPZTR0dFaW1vT0dGBxWsaHBzkhhtuyPPPP5/q6qqSZMPP/ywldXVBd/97nfzc5/97Do9HpeSkpJ85StfyWOPPZb7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';

const SectionTitle = ({ children }) => (
  <Text style={styles.sectionTitle}>{children}</Text>
);

const ExternalLink = ({ url, children }) => {
  const handlePress = React.useCallback(() => {
    Linking.openURL(url);
  }, [url]);

  return (
    <TouchableOpacity onPress={handlePress}>
      <Text style={styles.link}>{children}</Text>
    </TouchableOpacity>
  );
};

export default function App() {
  const { width } = useWindowDimensions();
  const chartWidth = Math.min(width - 32, 720);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>Cravings without the damage.</Text>
          <Text style={styles.heroTagline}>
            Metaverse Food offers a guilt-free, immersive food experience – satisfy your cravings virtually while
            building healthier eating habits in real life.
          </Text>
        </View>

        <View style={styles.section}>
          <SectionTitle>Key Health & Nutrition Stats</SectionTitle>
          <View style={styles.statsGrid}>
            {stats.map((stat) => (
              <View key={stat.label} style={styles.statCard}>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>
                  {stat.label} <Text style={styles.superscript}>[{stat.source}]</Text>
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <SectionTitle>Comparative Impact</SectionTitle>
          <View style={styles.chartWrapper}>
            <BarChart
              style={styles.chart}
              data={chartData}
              width={chartWidth}
              height={320}
              withInnerLines
              fromZero
              chartConfig={chartConfig}
              verticalLabelRotation={0}
              showBarTops
              withCustomBarColorFromData
              flatColor
              segments={6}
              yAxisLabel=""
              yAxisSuffix=""
              yAxisInterval={1}
              formatYLabel={(value) =>
                formatCompactValue(Math.pow(10, Number(value)))
              }
            />
          </View>
          <Text style={styles.chartNote}>
            All values shown on a base-10 log scale for comparability. See data sources [1]–[5] below.
          </Text>
        </View>

        <View style={[styles.section, styles.comingSoon]}> 
          <View style={styles.comingImageWrapper}>
            <Image source={{ uri: prototypeImage }} style={styles.comingImage} resizeMode="cover" />
          </View>
          <View style={styles.comingContent}>
            <SectionTitle>Coming Soon</SectionTitle>
            <View style={styles.bulletList}>
              {[
                'Personalized craving maps',
                'Habit loops and weekly targets',
                'Open API for nutrition partners',
              ].map((item) => (
                <View key={item} style={styles.bulletItem}>
                  <View style={styles.bulletDot} />
                  <Text style={styles.bulletText}>{item}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <SectionTitle>Contact</SectionTitle>
          <Text style={styles.contactText}>
            Email: <ExternalLink url="mailto:basil@gmail.com">basil@gmail.com</ExternalLink>
          </Text>
          <Text style={styles.contactText}>
            Phone: <ExternalLink url="tel:+919895000880">+91-9895***880</ExternalLink>
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2025 Metaverse Food. Prototype preview for concept validation.</Text>
        </View>

        <View style={styles.sourcesSection}>
          <SectionTitle>Data Sources</SectionTitle>
          {sources.map((source) => (
            <View key={source.id} style={styles.sourceItem}>
              <Text style={styles.sourceText}>
                [{source.id}] {source.label}{' '}
                <Text style={styles.link} onPress={() => Linking.openURL(source.url)}>
                  Visit source
                </Text>
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#121212',
  },
  container: {
    paddingBottom: 48,
    paddingHorizontal: 16,
    backgroundColor: '#121212',
  },
  hero: {
    paddingVertical: 48,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  heroTitle: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 16,
  },
  heroTagline: {
    color: '#eeeeee',
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 26,
    maxWidth: 640,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  statCard: {
    backgroundColor: '#1e1e1e',
    borderRadius: 10,
    padding: 20,
    flexBasis: '48%',
    marginBottom: 16,
  },
  statValue: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  statLabel: {
    color: '#cccccc',
    fontSize: 14,
    lineHeight: 20,
  },
  superscript: {
    fontSize: 12,
    color: '#76b7b2',
  },
  chartWrapper: {
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
    paddingVertical: 16,
    borderRadius: 12,
  },
  chart: {
    paddingRight: 0,
  },
  chartNote: {
    color: '#aaaaaa',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 12,
  },
  comingSoon: {
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  comingImageWrapper: {
    flexBasis: '48%',
    minWidth: 260,
  },
  comingImage: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 12,
  },
  comingContent: {
    flex: 1,
    minWidth: 260,
    justifyContent: 'center',
  },
  bulletList: {
    marginTop: 8,
    gap: 12,
  },
  bulletItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  bulletDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#f28e2b',
    marginTop: 8,
    marginRight: 10,
  },
  bulletText: {
    color: '#eeeeee',
    fontSize: 16,
    flex: 1,
    lineHeight: 24,
  },
  contactText: {
    color: '#dddddd',
    fontSize: 16,
    marginBottom: 8,
  },
  footer: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  footerText: {
    color: '#666666',
    fontSize: 14,
    textAlign: 'center',
  },
  sourcesSection: {
    marginTop: 16,
  },
  sourceItem: {
    marginBottom: 12,
  },
  sourceText: {
    color: '#aaaaaa',
    fontSize: 14,
    lineHeight: 22,
  },
  link: {
    color: '#76b7b2',
    textDecorationLine: 'underline',
  },
});
