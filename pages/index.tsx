import { ComponentGoogleAds, ComponentRandom, Listing } from '@components';
import { IMovies, ISeoInfo } from '@interface';
import { FlexCenter } from '@styles';
import { BANNER_SLOT, CLIENT_KEY, fetcher } from '@utils';
import MetaTags from 'components/MetaTags';
import type { NextPage } from 'next';
interface IProps {
  data: IMovies;
  error?: string;
}
const Home: NextPage<IProps> = ({ data, error }) => {
  const metaData: ISeoInfo = {
    title: `Soulkingdom - watch films online`,
    description: `Soulkingdom - watch films online`
  };

  if (error) {
    return (
      <FlexCenter>
        <p>{error}</p>
      </FlexCenter>
    );
  }

  return (
    <>
      <MetaTags metaData={metaData} />
      <ComponentGoogleAds
        currentPath="home"
        client={CLIENT_KEY}
        slot={BANNER_SLOT}
      />
      <ComponentRandom carousels={data?.carousels} />
      <Listing
        animes={data?.anime}
        latest={data?.latest}
        tv_shows={data?.tv_shows}
        movies={data?.movies}
        data={data}
      />
    </>
  );
};
export async function getStaticProps() {
  let error = '';
  let data = {};
  try {
    const res = await fetcher('/home');
    console.log(res);
    data = res;
  } catch (e: any) {
    error = e.toString();
  }
  return { props: { data, error } };
}

export default Home;
