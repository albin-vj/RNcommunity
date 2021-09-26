import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TextInput,
  Text,
  BackHandler,
  FlatList,
  RefreshControl,
} from 'react-native';
import {
  handleAndroidBackButton,
  removeAndroidBackButtonHandler,
} from '../utils/AndroidBackButton';
import {Actions} from '../redux/actions';
import {useSelector, useDispatch} from 'react-redux';
import {NBIcon as Icon, NBToast as Toast} from '../components/nativeBase';
import Colors from '../config/Colors';
import Strings from '../config/Strings';
import NetworkCall from '../api/Networkcall';
import {GET_REPOS} from '../api/Api';
import {UseTabs, UseTab, HeaderIcon} from '../components/GeneralComponents';
import {HeaderView} from '../components/HeaderView';
import {RNPicker as Picker} from '../components/RNPicker';
import {typeData, languageData, sortData} from '../config/dummyData';
import RecycleTestComponent from '../components/RecyclerView';

const Landing = ({}) => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [tab, setTab] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const useRecyclerView = true;
  /**
   *(bind data)
   *@param  :null
   *@return :null
   *@created by    :albin
   *@modified by   :albin
   *@modified date :26/09/21
   */
  const bindData = async () => {
    dispatch(Actions.showHideProgress());
    await fetchData();
    dispatch(Actions.showHideProgress());
  };
  useEffect(() => {
    handleAndroidBackButton(() => backPress());
    return () => {
      removeAndroidBackButtonHandler();
    };
  }, []);
  /**
   *(back press)
   *@param  :null
   *@return :null
   *@created by    :albin
   *@modified by   :albin
   *@modified date :26/09/21
   */
  const backPress = () => {
    BackHandler.exitApp();
  };
  /**
   *(refresh list)
   *@param  :null
   *@return :null
   *@created by    :albin
   *@modified by   :albin
   *@modified date :26/09/21
   */
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    bindData();
    setRefreshing(false);
  }, [refreshing]);

  /**
   *(fetch data from server)
   *@param  :null
   *@return :null
   *@created by    :albin
   *@modified by   :albin
   *@modified date :26/09/21
   */
  const fetchData = async () => {
    var data = await NetworkCall.post(GET_REPOS);
    if (!data) {
      Toast({text: Strings.something_wrong, type: 'danger'});
      return;
    }
    if (data.error) {
      Toast({text: Strings.connection_error, type: 'danger'});
      return;
    }
    if (data.length > 0) {
      dispatch(Actions.SetRepositoryData(data));
      dispatch(Actions.SetRepositoryDataCopy(data));
    }
  };

  /**
   *(search)
   *@param  :null
   *@return :null
   *@created by    :albin
   *@modified by   :albin
   *@modified date :26/09/21
   */
  const search = (text) => {
    try {
      if (!text) {
        dispatch(Actions.SetRepositoryData(state.repositoryDataCopy));
        return;
      }
      var result = state.repositoryDataCopy.filter(function (item) {
        if (
          (item.name && item.name.toLowerCase().includes(text.toLowerCase())) ||
          (item.full_name &&
            item.full_name.toLowerCase().includes(text.toLowerCase()))
        )
          return item;
      });
      dispatch(Actions.SetRepositoryData(result));
    } catch (err) {}
  };
  /**
   *(change tab)
   *@param  :null
   *@return :null
   *@created by    :albin
   *@modified by   :albin
   *@modified date :26/09/21
   */
  const changeTab = (tab) => {
    setTab(tab);
    if (tab == 1 && state.repositoryDataCopy?.length == 0) bindData();
  };

  /**
   *(empty list view)
   *@param  :null
   *@return :view
   *@created by    :albin
   *@modified by   :albin
   *@modified date :26/09/21
   */
  const EmptyListItem = ({text}) => {
    return !state.progress ? (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text
          style={{
            color: Colors.darkGray,
            fontSize: Dimensions.get('screen').width * 0.04,
          }}>
          {text ?? Strings.no_repositories}
        </Text>
      </View>
    ) : null;
  };
  /**
   *(repository item view)
   *@param  :Item
   *@return :view
   *@created by    :albin
   *@modified by   :albin
   *@modified date :26/09/21
   */
  const RepositoryItemList = ({item}) => {
    return (
      <View
        style={{
          backgroundColor: Colors.white,
          justifyContent: 'center',
          borderRadius: 2,
          marginHorizontal: 15,
          elevation: 1,
          padding: 10,
        }}>
        <Text
          numberOfLines={1}
          style={{
            color: Colors.blue,
            fontSize: 15,
            fontWeight: 'bold',
            padding: 2,
          }}>
          {item.name ?? ''}
        </Text>
        <Text
          numberOfLines={2}
          style={{color: Colors.black, fontSize: 12, padding: 2}}>
          {item.full_name ?? ''}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
          {item.language ? (
            <IconView
              text={item.language}
              name={'circle'}
              type={'MaterialIcons'}
              iconStyle={{color: Colors.green, padding: 5, fontSize: 10}}
            />
          ) : null}
          {item.license?.key ? (
            <IconView
              text={item.license.key}
              name={'license'}
              type={'MaterialCommunityIcons'}
            />
          ) : null}
          {item.forks_count ? (
            <IconView
              text={item.forks_count}
              name={'source-fork'}
              type={'MaterialCommunityIcons'}
            />
          ) : null}
          {item.stargazers_count ? (
            <IconView
              text={item.stargazers_count}
              name={'star-border'}
              type={'MaterialIcons'}
            />
          ) : null}
          {item.watchers ? (
            <IconView
              text={item.watchers}
              name={'eye-outline'}
              type={'MaterialCommunityIcons'}
            />
          ) : null}
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
          {item.open_issues ? (
            <IconView
              text={'( ' + item.open_issues + ' issues need help ) '}
              name={'help-outline'}
              type={'MaterialIcons'}
            />
          ) : null}
        </View>
      </View>
    );
  };
  /**
   *(Icon  view)
   *@param  :null
   *@return :view
   *@created by    :albin
   *@modified by   :albin
   *@modified date :26/09/21
   */
  const IconView = ({text, type, name, iconStyle}) => {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          padding: 5,
        }}>
        <Icon
          style={iconStyle ?? {color: Colors.grey, padding: 5, fontSize: 10}}
          name={name}
          type={type}
        />
        <Text
          style={{
            color: Colors.darkGray,
            fontSize: Dimensions.get('screen').width * 0.025,
          }}>
          {text}
        </Text>
      </View>
    );
  };
  /**
   *(filter view)
   *@param  :Item
   *@return :view
   *@created by    :albin
   *@modified by   :albin
   *@modified date :26/09/21
   */
  const FilterView = ({data, value}) => {
    return (
      <View
        style={{
          paddingVertical: 10,
          flex: 1,
          paddingHorizontal: 1,
          justifyContent: 'center',
        }}>
        <View
          style={{
            backgroundColor: Colors.lightGrey,
            borderRadius: 8,
            justifyContent: 'center',
          }}>
          <Picker
            selectedValue={value}
            mode="dropdown"
            style={{}}
            data={data}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={style.container}>
      <HeaderView />
      <UseTabs
        initialPage={state.landingPageTab ?? 0}
        onChangeTab={({i}) => {
          changeTab(i);
        }}
        tabBarUnderlineStyle={{backgroundColor: Colors.rose, borderRadius: 5}}>
        <UseTab
          heading={Strings.overview}
          tabStyle={{backgroundColor: Colors.white}}
          textStyle={style.tabTextStyle}
          activeTabStyle={{backgroundColor: Colors.white}}
          activeTextStyle={style.tabTextStyle}>
          <EmptyListItem text={Strings.no_data} />
        </UseTab>
        <UseTab
          heading={Strings.repositories}
          tabStyle={{backgroundColor: Colors.white}}
          textStyle={style.tabTextStyle}
          activeTabStyle={{backgroundColor: Colors.white}}
          activeTextStyle={style.tabTextStyle}>
          <View style={style.SectionStyle}>
            <Icon
              style={{color: Colors.grey, padding: 5, fontSize: 15}}
              name={'search'}
              type={'MaterialIcons'}
            />
            <TextInput
              style={{flex: 1, marginLeft: 5}}
              placeholder={Strings.searchRepo}
              underlineColorAndroid="transparent"
              onChangeText={(text) => {
                search(text);
              }}
            />
          </View>
          <View
            style={{
              margin: 10,
              height: 30,
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              width: '95%',
            }}>
            <FilterView data={typeData} />
            <FilterView data={languageData} />
            <FilterView data={sortData} />
          </View>
          <View style={{justifyContent: 'center', flex: 1}}>
            {useRecyclerView ? (
              <>
                {state.repositoryData?.length > 0 ? (
                    <>
                    <Text style={{padding: 15}}>{Strings.repositories}</Text>
                  <RecycleTestComponent
                    height={Dimensions.get('screen').width * 0.42}
                    bottommargin={Dimensions.get('screen').width * 0.05}
                    data={state.repositoryData}
                    renderView={({data, index}) => (
                      <RepositoryItemList item={data} Index={index} />
                    )}
                    onRefresh={onRefresh}></RecycleTestComponent>
                    </>
                ) : (
                  EmptyListItem({text: Strings.no_repositories})
                )}
              </>
            ) : (
              <FlatList
                contentContainerStyle={{paddingBottom: 20}}
                refreshControl={
                  <RefreshControl
                    colors={[Colors.black, Colors.black]}
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
                data={state.repositoryData}
                renderItem={RepositoryItemList}
                keyExtractor={(item, index) => index.toString()}
                ListEmptyComponent={EmptyListItem}
                ItemSeparatorComponent={() => {
                  return (
                    <View
                      style={{
                        height: 0.5,
                        backgroundColor: Colors.lightGrey,
                        marginHorizontal: 20,
                      }}
                    />
                  );
                }}
                ListHeaderComponent={
                  <Text style={{padding: 15}}>{Strings.repositories}</Text>
                }
              />
            )}
          </View>
        </UseTab>
        <UseTab
          heading={Strings.packages}
          tabStyle={{backgroundColor: Colors.white}}
          textStyle={style.tabTextStyle}
          activeTabStyle={{backgroundColor: Colors.white}}
          activeTextStyle={style.tabTextStyle}>
          <EmptyListItem text={Strings.no_data} />
        </UseTab>
      </UseTabs>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  SectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderWidth: 0.5,
    borderColor: Colors.grey,
    borderRadius: 5,
    marginVertical: 20,
    marginHorizontal: 15,
  },
  tabTextStyle: {
    color: Colors.black,
    fontSize: Dimensions.get('screen').width * 0.035,
  },
});

export default Landing;
