import React, { useEffect, useRef, useState } from 'react';
import { Stack, Pagination, CircularProgress, Box, List, Dialog, DialogActions, DialogContent } from '@mui/material';
import { useScreenResizeOrOrientation } from 'hooks/useScreenResizeOrOrientation';
import { IRequest, IResponsePage, IGrouping, IObjectInfo, IPageInfoResponse, IFilterProperty, ISortProperty, 
  IPageInfoRequest, localizationCore, FilterPropertyHelper } from 'lotus-core';
import { toastError, ToastWrapper } from 'ui/components/Feedback';
import { TPlacementDensity } from 'ui/types';
import { LayoutHelper } from 'app/layout';
import { Button } from 'ui/components/Controls';
import { FaFilter } from 'react-icons/fa';
import { DialogAppBar } from 'ui/components/Display';
import { DensityButton } from './components/DensityButton';
import { FormFilter } from './components/FormFilter';
import { IFormFilterRefType } from './components/FormFilter/FormFilter';
import { SortButton } from './components/SortButton';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface IListViewProps<TItem extends Record<string, any>> 
{
  onGetItems: (filter: IRequest) => Promise<IResponsePage<TItem>>
  renderList: (list: TItem[]|IGrouping<TItem>[], density: TPlacementDensity) => JSX.Element;
  objectInfo: IObjectInfo;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ListView = <TItem extends Record<string, any>>(props: IListViewProps<TItem>) => 
{
  const { onGetItems, renderList, objectInfo} = props;

  const pageSize = 10;

  // Получение данных
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState<TItem[]>([]);
  const [pageInfo, setPageInfo] = useState<IPageInfoResponse>({ pageNumber: 0, pageSize: pageSize, currentPageSize: 10, totalCount: 10 });
  const [paginationModel, setPaginationModel] = useState({ pageSize: pageSize, pageIndex: 1 });

  // Фильтрация
  const formFilterRef = useRef<IFormFilterRefType>(null);
  const [filterProperties, setFilterProperties] = useState<IFilterProperty[]>([]);
  const [openFilterDialog, setOpenFilterDialog] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isFilterStatus, setIsFilterStatus] = useState<boolean>(false);

  // Сортировка
  const [sortProperties, setSortProperties] = useState<ISortProperty[]>([]);

  // Плотность размещения
  const [placementDensity, setPlacementDensity] = useState<TPlacementDensity>('normal');

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [autoCloseToastify, setAutoCloseToastify] = useState<number | false>(2000);

  // Ссылки на элементы
  const refTabFilter = useRef(null);
  const refPagination = useRef(null);

  // Размеры и отступы
  const marginBottom = 10;
  const marginTop = 10;
 
  const [heightTabFilter, setHeightTabFilter] = useState<number>(0);
  const [heightPagination, setHeightPagination] = useState<number>(0);

  const calcHeightViewList = ():number =>
  {
    return LayoutHelper.getClientHeight() - (marginTop + marginBottom + heightTabFilter + heightPagination);
  }

  const [heightViewList, setHeightViewList] = useState<number>(calcHeightViewList());

  //
  // Получение данных
  //
  const getFilterQueryItems = (): IRequest => 
  {
    const pageInfo: IPageInfoRequest = { pageNumber: paginationModel.pageIndex - 1, pageSize: paginationModel.pageSize };

    const filtering = filterProperties;

    const sorting = sortProperties;

    return { pageInfo: pageInfo, filtering:filtering, sorting:sorting };
  }

  const refreshItems = (async (filter: IRequest) => 
  {
    try 
    {
      setIsLoading(true);

      const response = await onGetItems(filter);

      setItems(response.payload!);
      setPageInfo(response.pageInfo!);

      setIsLoading(false);
    }
    catch (exc) 
    {
      setIsLoading(false);
      toastError(exc, localizationCore.actions.gettingFailed);
    }
  });

  //
  // Изменение макета
  //

  const handleScreenChange = ()=>
  {
    setHeightViewList(calcHeightViewList());
  }

  //
  // Фильтрация
  //
  const handleCloseFilterDialog = () => 
  {
    setOpenFilterDialog(false);
  }

  const handleOpenFilterDialog = () => 
  {
    setOpenFilterDialog(true);
  }

  const handleApplyFilterProperties = () =>
  {
    const actualFilters = formFilterRef.current!.getFilters();
    setOpenFilterDialog(false);

    const hasValues = FilterPropertyHelper.hasValues(actualFilters);

    setIsFilterStatus(hasValues);

    setFilterProperties(actualFilters);
  }

  const handleClearFilterProperties = () =>
  {
    formFilterRef.current!.clearFilters();
    setFilterProperties([]);
    setIsFilterStatus(false);
    setOpenFilterDialog(false);
  }

  //
  // Пагинация
  //
  const pageChangeHandle = (event: React.ChangeEvent<unknown>, page: number) =>
  {
    setPaginationModel({pageSize: paginationModel.pageSize, pageIndex: page});
  }

  const getCountPage = ():number =>
  {
    if(pageInfo.totalCount <= pageSize)
    {
      return 0;
    }

    return Math.ceil(pageInfo.totalCount / pageSize);
  }

  //
  // Методы жизненного цикла
  //
  useScreenResizeOrOrientation(handleScreenChange);

  useEffect(() => 
  {
    const filter = getFilterQueryItems();
    refreshItems(filter);
  }, [paginationModel.pageIndex, paginationModel.pageSize, filterProperties, sortProperties]);

  useEffect(() => 
  {
    const elemTabFilter: HTMLElement = refTabFilter.current! as HTMLElement;
    setHeightTabFilter(elemTabFilter.clientHeight);

    const elemPagination: HTMLElement = refPagination.current! as HTMLElement;
    setHeightPagination(elemPagination.clientHeight);

    setHeightViewList(calcHeightViewList());
  }, [refTabFilter.current, refPagination.current]); 

  return (
    <>
      <Stack ref={refTabFilter} display='flex' flexDirection='row' justifyContent='space-around' width='400px' >
        <SortButton
          objectInfo={objectInfo}
          initialSortProperties={sortProperties}
          onSetSortProperties={setSortProperties}
        />
        <DensityButton
          initialDensity={placementDensity}
          onSetPlacementDensity={setPlacementDensity}/>
        <Button variant='filled' onClick={handleOpenFilterDialog}>
          <FaFilter />
        </Button>
      </Stack>
      <Box sx={{height: heightViewList, overflow: 'scroll'}}>
        <List>
          <Stack display='flex' flexDirection='column' justifyContent='flex-start' alignItems='center' >
            {isLoading && <CircularProgress color='secondary' />}
            {!isLoading && renderList(items, placementDensity)}  
          </Stack>
        </List>
      </Box>
      <Stack ref={refPagination} sx={{marginTop: '10px'}} display='flex' flexDirection='row' justifyContent='center' >
        <Pagination size='large' count={getCountPage()} 
          onChange={pageChangeHandle}
          page={paginationModel.pageIndex} shape='rounded' />
      </Stack>    
      <ToastWrapper
        autoClose={autoCloseToastify}
      />
      <Dialog
        fullScreen
        open={openFilterDialog}
        onClose={handleCloseFilterDialog}>
        <DialogAppBar onClose={handleCloseFilterDialog}/>
        <DialogContent>
          <FormFilter
            ref={formFilterRef}
            initialFilterProperties={filterProperties}
            objectInfo={objectInfo}
          />
        </DialogContent>
        <DialogActions>
          <Button variant='outline' color='warning' onClick={handleClearFilterProperties}>{localizationCore.actions.clear}</Button>
          <Button variant='outline' onClick={handleCloseFilterDialog}>{localizationCore.actions.cancel}</Button>
          <Button variant='outline' autoFocus onClick={handleApplyFilterProperties}>{localizationCore.actions.confirm}</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
