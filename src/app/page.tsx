import LanguagesList from "./components/LanguagesList";
import Searchbar from "./components/Searchbar";
import CustomLink from "./components/CustomLink";
import ChannelInput from "./components/ChannelInput";


export default function Home() {
  return (
    <main className="h-screen flex flex-col pb-8">
      <Searchbar />
      <LanguagesList />
      <ChannelInput />
      <CustomLink href="/conversation" className="flex mt-auto">
        <div className="text-white bg-blue_default py-[1rem] flex-1 px-2 rounded-3xl text-center">
          <span className="">Start interview</span>
        </div>
      </CustomLink>
    </main>
  );
}
