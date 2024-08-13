import { Dimensions, StyleSheet } from 'react-native';

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  chartView: {
    marginHorizontal: 0,
    marginBottom: 20,
    backgroundColor: '#ddd',
    borderRadius: 16,
    alignItems: 'center',
    paddingTop: 12,
  },
  price: {
    fontSize: 20,
    marginVertical: 5,
  },
  listItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  symbol: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  priceList: {
    fontSize: 16,
  },
  labelsView: {
    width: width,
    borderTopColor: 'black',
    borderTopWidth: 1,
    marginBottom: 16,
    marginTop: 0,
    padding: 0
  },
  labelView: {
    width: 1,
    height: 10,
    borderLeftColor: 'black',
    borderLeftWidth: 1,
  },
  labelsViewInner: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  }

})

export default styles;