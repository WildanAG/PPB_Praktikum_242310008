import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, SafeAreaView } from 'react-native';

const transactionHistory =[
    {
        id: 1,
        date:,
        price:,
        status:,

    },
      {
        id: 1,
        date:,
        price:,
        status:,

    },
     {
        id: 1,
        date:,
        price:,
        status:,

    },
]

export default function HistoryScreen() {
  const [activeFilter, setActiveFilter] = useState('All Orders');
   
  const filteredTransactions = INITIAL_TRANSACTIONS.filter((item) => {
    if (activeFilter === 'All Orders') return true;
    return item.status === activeFilter.toUpperCase();
  });

    return (
    <SafeAreaView className="flex-1 bg-slate-50">
      {/* 1. Header Utama */}
      <HeaderSection />

      {/* 2. Kartu Ringkasan Performa */}
      <SummaryCard />

      {/* 3. Komponen Filter Kategori */}
      <FilterTabs activeFilter={activeFilter} onSelectFilter={setActiveFilter} />

      {/* 4. Daftar Riwayat Transaksi */}
      <FlatList
        data={filteredTransactions}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <TransactionItem item={item} />}
        ListEmptyComponent={<EmptyState />}
      />
    </SafeAreaView>
  );
}

const HeaderSection = () => (
  <View className="flex-row justify-between items-center px-4 py-4 bg-white border-b border-slate-100">
    <View className="flex-row items-center space-x-2">
      <View className="w-8 h-8 rounded-lg bg-blue-50 items-center justify-center">
        <MaterialCommunityIcons name="storefront" size={18} color="#1d4ed8" />
      </View>
      <Text className="text-lg font-black text-slate-800 tracking-tight">RetailFlow POS</Text>
    </View>
    <TouchableOpacity className="w-9 h-9 bg-slate-50 rounded-full items-center justify-center border border-slate-100 active:bg-slate-100">
      <Feather name="search" size={18} color="#64748b" />
    </TouchableOpacity>
  </View>
);

const SummaryCard = () => (
  <View className="m-4 p-5 bg-white border border-slate-100 rounded-2xl shadow-sm flex-row justify-between items-center">
    <View>
      <Text className="text-xs font-semibold text-slate-400 tracking-wider uppercase">Today's Activity</Text>
      <Text className="text-2xl font-black text-slate-800 mt-0.5">History</Text>
    </View>
    <View className="items-end">
      <Text className="text-xs font-semibold text-slate-400 tracking-wider uppercase">Total Volume</Text>
      <Text className="text-2xl font-black text-blue-600 mt-0.5">$4,282.50</Text>
    </View>
  </View>
);

const FilterTabs = ({ activeFilter, onSelectFilter }) => (
  <View className="mb-2">
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingLeft: 16, paddingRight: 8 }}>
      {FILTER_CATEGORIES.map((category) => {
        const isActive = activeFilter === category;
        return (
          <TouchableOpacity
            key={category}
            onPress={() => onSelectFilter(category)}
            className={`px-5 py-2.5 rounded-full mr-2.5 transition-all ${
              isActive 
                ? 'bg-slate-900 shadow-sm shadow-slate-900/20' 
                : 'bg-white border border-slate-200/80 active:bg-slate-50'
            }`}
          >
            <Text className={`text-xs font-bold ${isActive ? 'text-white' : 'text-slate-600'}`}>
              {category}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  </View>
);
const TransactionItem = ({ item }) => {
  const config = STATUS_CONFIG[item.status] || { bg: 'bg-slate-100', text: 'text-slate-600', iconBg: 'bg-slate-400', icon: 'help-circle' };
  
  return (
    <View className="flex-row items-center justify-between p-4 bg-white border border-slate-100 rounded-xl mb-3 shadow-xs">
      {/* Sisi Kiri: Status Badge & Invoice Details */}
      <View className="flex-row items-center space-x-3 flex-1">
        <View className={`w-10 h-10 rounded-xl ${config.iconBg} items-center justify-center`}>
          <Feather name={config.icon} size={16} color="white" />
        </View>
        <View className="ml-1 flex-shrink-1">
          <Text className="font-extrabold text-slate-800 text-sm tracking-tight">{item.id}</Text>
          <Text className="text-xs text-slate-400 mt-0.5 font-medium">{item.date}</Text>
        </View>
      </View>

      {/* Sisi Kanan: Nominal & Badge Text */}
      <View className="items-end ml-2">
        <Text className="font-black text-slate-800 text-base tracking-tight">${item.amount.toFixed(2)}</Text>
        <View className={`px-2.5 py-1 rounded-md mt-1.5 ${config.bg}`}>
          <Text className={`text-[10px] font-black tracking-wider uppercase ${config.text}`}>
            {item.status}
          </Text>
        </View>
      </View>
    </View>
  );
};

const EmptyState = () => (
  <View className="items-center justify-center py-16 bg-white border border-dashed border-slate-200 rounded-2xl">
    <View className="w-12 h-12 bg-slate-50 rounded-full items-center justify-center mb-3">
      <Feather name="folder-minus" size={22} color="#94a3b8" />
    </View>
    <Text className="text-sm font-bold text-slate-500">Tidak Ada Transaksi</Text>
    <Text className="text-xs text-slate-400 mt-1">Ganti filter atau buat pesanan baru.</Text>
  </View>
);