let imgUrl = "https://image.tmdb.org/t/p/w500"
let topRatUrl= "https://api.themoviedb.org/3/movie/top_rated?api_key=81e23fe235051c37f5bf3559cf4ea894"
let searchUrlBefo = "https://api.themoviedb.org/3/search/movie?query="
let searchUrlAfter = "&api_key=81e23fe235051c37f5bf3559cf4ea894&language=en-US&include_adult=false"
let popularUrl = "https://api.themoviedb.org/3/movie/popular?api_key=81e23fe235051c37f5bf3559cf4ea894"
let upCommingUrl = "https://api.themoviedb.org/3/movie/upcoming?api_key=81e23fe235051c37f5bf3559cf4ea894"
let trendingUrl ="https://api.themoviedb.org/3/trending/all/day?api_key=81e23fe235051c37f5bf3559cf4ea894"
let nowPlayingUrl = "https://api.themoviedb.org/3/movie/now_playing?api_key=81e23fe235051c37f5bf3559cf4ea894"

        getMovie(popularUrl);




        async function getMovie(url){

            apiResponse = await fetch(`${url}`)
            responsData = await apiResponse.json()
            showMovie();
        }


        function showMovie(){
            let hasala = ``
            let title ; 
            let release;
            for( let i = 0 ; i<responsData.results.length ; i++)
            {
                if(responsData.results[i].title == undefined && responsData.results[i].original_name == undefined){
                    title = responsData.results[i].original_title
            }else if(responsData.results[i].original_title == undefined){
                title = responsData.results[i].original_name
            }else if(responsData.results[i].original_name == undefined){
                title = responsData.results[i].title
            }
        if(responsData.results[i].first_air_date == undefined){
            release = responsData.results[i].release_date
        }else if(responsData.results[i].release_date == undefined){
        release = responsData.results[i].first_air_date
        }
                hasala+=`
                <div class="col-md-4 g-4">
                        <div class="img-fram position-relative">
                          <div>
                            <img src=${imgUrl + responsData.results[i].backdrop_path} alt="">
                          </div>
                          <div class="img-layer text-black">
                            <h4>${title}</h4>
                            <p>${responsData.results[i].overview}</p>
                            <p>rate: ${responsData.results[i].vote_average}</p>
                            <p>date: ${release}</p>
                          </div>
                         
                        </div>
                      </div> `
            }
            document.querySelector("#playM").innerHTML=hasala
        }


        $("#now").click(function(){
            getMovie(nowPlayingUrl);
        })
        $("#popular").click(function(){
            getMovie(popularUrl);
        })
        $("#topM").click(function(){
            getMovie(topRatUrl);
        })
        $("#trindy").click(function(){
            getMovie(trendingUrl);
        })
        $("#upComming").click(function(){
            getMovie(upCommingUrl);
        })
$(".fa-sliders").click(function(){
    let slidWidth = $(".slidHid").outerWidth()
    let sleft = $(".sideMin").css("left")
    console.log(sleft);
    if(sleft == "0px")
    {
        $(".sideMin").animate( {left : `-${slidWidth}`}, 1000)
        $(".slideI").fadeIn(4000)
    }
    else
    {
        $(".sideMin").animate( {left : "0px"}, 1000)
                $(".slideI").fadeIn(4000)
    }
    // $(".sideMin").animate( {left : `-${slidWidth}`}, 1000)

})

$("#allMovies").keyup(function(){
    let searchWord = allMovies.value;
    if(searchWord){
        getMovie(searchUrlBefo + searchWord + searchUrlAfter)
    }
    else
    {
        getMovie(upCommingUrl);
    }
})
$("#Email").keyup(function(){
    let mail = mailInput.value;
    let mailReg = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
    if(mailReg.test(mail)==true && mail != "")
    {
        $("#alert").css({display : "none"})
    }else
    {
        $("#alert").css({display : "block"})

    }


})