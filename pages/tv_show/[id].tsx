import {
  ComponentNotFound,
  ComponentVideoAds,
  DownloadBtn,
  Sidebar
} from '@components';
import { ads_url, defaultImageCast } from '@constants';
import { IMovieDetail, ISeasonEpisode, ISeoInfo } from '@interface';
import {
  DetailStyles,
  FlexCenter,
  MainContent,
  SeactionHeading
} from '@styles';
import {
  fetcher,
  generateEpisodesByNumber,
  HOST_PATH,
  light,
  TELEGRAM_LINK
} from '@utils';
import MetaTags from 'components/MetaTags';
import { Social } from 'components/Social';
import type { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { BeatLoader } from 'react-spinners';
import useSWR from 'swr';

const TVShowDetail: NextPage = () => {
  const {
    query: { id }
  } = useRouter();
  const [seasons, setSeasons] = useState<ISeasonEpisode[]>([]);
  const { data, error } = useSWR<IMovieDetail, Error>(
    `/tv-shows/${id || 0}`,
    fetcher
  );

  useEffect(() => {
    const generateEpisodes = () => {
      const formatEpisode: ISeasonEpisode[] = [];
      data?.seasons?.map(async season => {
        const episode = await generateEpisodesByNumber(season?.total_episodes);
        formatEpisode.push({
          id: season.id,
          episodes: episode
        });
      });
      setSeasons(formatEpisode);
    };
    if (data) {
      generateEpisodes();
    }
  }, [data]);

  if (error) {
    return (
      <>
        <div>
          {JSON.stringify(error?.message)}
          <ComponentNotFound />
        </div>
      </>
    );
  }

  const metaData: ISeoInfo = {
    title: `${data?.name} films - watch ${data?.name}  on soulkingdom `,
    description: `${data?.overview} complete cast of ${data?.name} `
  };

  return (
    <MainContent>
      {data === undefined ? (
        <FlexCenter>
          <BeatLoader color={light.primary_500} />
        </FlexCenter>
      ) : (
        <DetailStyles>
          <MetaTags metaData={metaData} />
          <section className="listing-layout">
            <section className="content-body">
              <div className="detail">
                <div className="image">
                  <Image
                    src={data?.cover_path}
                    alt={data?.name}
                    width={160}
                    height={237}
                    loading={'lazy'}
                    placeholder="blur"
                    blurDataURL="/soul-kingdom-placeholder-cast.png"
                  />
                </div>
                <div className="info">
                  <SeactionHeading>{`${data?.name} ( ${data?.mm_name} )`}</SeactionHeading>
                  <p className="small">{data?.released_date}</p>
                  <div className="type">
                    {data?.genres.map((item, index) => (
                      <span key={index}>{item.name}</span>
                    ))}
                  </div>
                  <p className="small">{`IMDB - ${data?.rating}`}</p>
                </div>
              </div>
              <ComponentVideoAds img_url="/shan9-vip.mp4" url={ads_url} />
              <div className="description">
                <SeactionHeading>Complete Cast</SeactionHeading>
                <p>{data?.overview}</p>
                <Image
                  src={data?.backdrop_path || defaultImageCast}
                  alt={data?.name}
                  width={500}
                  height={288}
                  loading={'lazy'}
                  placeholder="blur"
                  blurDataURL="/soul-kingdom-placeholder-cast.png"
                />
              </div>
              <ComponentVideoAds img_url="/taung-paw-thar.mp4" url={ads_url} />
              <div className="download">
                <header>
                  <h4>Download Links</h4>
                </header>
                {seasons.length > 0 &&
                  seasons.map((season, index) => (
                    <section className="wrap-season" key={index}>
                      <h4>{`Season - ${index + 1}`}</h4>
                      <article className="download-grid">
                        {season.episodes.map((episode, index) => (
                          <DownloadBtn
                            alt="download button"
                            id={season.id}
                            episode={episode}
                            key={index}
                          >
                            <p>{`Episode ${episode}`}</p>
                          </DownloadBtn>
                        ))}
                      </article>
                    </section>
                  ))}
              </div>
              <div className="share">
                <Social
                  fbLink={`${HOST_PATH}/tv_show/${id}` || '/'}
                  telLink={TELEGRAM_LINK || '/'}
                />
              </div>
              <ComponentVideoAds img_url="/shan9-vip.mp4" url={ads_url} />
            </section>
            <Sidebar />
          </section>
        </DetailStyles>
      )}
    </MainContent>
  );
};

export default TVShowDetail;
