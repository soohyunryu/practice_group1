//story_parser.cpp

//task: take in regular stories. split it by some criteria. add paragraph tags. 

//great idea. task for later. i could technically do this by hand. 

#include <getopt.h>
#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
//#include "xcode_redirect.hpp"
#include <cstdint>
#include <stdio.h>
#include <deque>
#include <limits>
#include <cmath>
#include <iomanip>

using namespace std;

class StoryParser {
public: 
    void get_options(int argc, char** argv);
    void run();

}





/*int main(int argc, char * argv[]) {

    //ios_base::sync_with_stdio(false);
    //cout << std::setprecision(2); // Always show 2 decimal places
    //cout << std::fixed; // Disable scientific notation for large numbers
    return 0;
}*/